import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import blackjackApi from '../app/services/blackjack';
import { getScore } from '../services/blackjackService';
import { STATUSES, PLAYERS, BLACKJACK_VALUE, DEALER_MIN_VALUE } from '../constants';

const {
  IDLE,
  PLAYER_TURN,
  DEALER_TURN,
  PLAYER_WINS,
  BLACKJACK,
  DEALER_WINS,
} = STATUSES;

const { PLAYER, DEALER } = PLAYERS;

export function useGameState (initialState) {
  const dispatch = useDispatch();
  const [gameState, setGameState] = useState(initialState);
  const [gameStatus, setGameStatus] = useState(PLAYER_TURN);

  const setGameStatusWithDelay = (gameStatus) => {
    setTimeout(() => {
      setGameStatus(gameStatus);
    }, 1000);
  };

  const playerStand = () => {
    setGameStatus(DEALER_TURN);
  };

  const drawCard = useCallback(async (player) => {
    const { deckId } = gameState;
    const { data: { cards } } = await dispatch(blackjackApi.endpoints.drawCardsFromDeck.initiate({ deckId, count: 1 }));

    setGameState({
      ...gameState,
      playerCards: player === PLAYER
        ? [...gameState.playerCards, ...cards]
        : gameState.playerCards,
      dealerCards: player === DEALER
        ? [...gameState.dealerCards, ...cards]
        : gameState.dealerCards,
    });
  }, [gameState]);

  const playerHit = () => {
    drawCard(PLAYER);
  };

  useEffect(() => {
    const dealerScore = getScore(gameState.dealerCards);
    const playerScore = getScore(gameState.playerCards);

    if (gameStatus === PLAYER_TURN) {
      if (playerScore === BLACKJACK_VALUE) {
        if (gameState.playerCards.length === 2 ) {
          setGameStatusWithDelay(BLACKJACK);
        } else {
          setGameStatusWithDelay(PLAYER_WINS);
        }
      } else if (playerScore > BLACKJACK_VALUE) {
        setGameStatusWithDelay(DEALER_WINS);
      }
    } else if (gameStatus === DEALER_TURN) {
      if (dealerScore < DEALER_MIN_VALUE) {
        drawCard(DEALER);
      } else {
        if (
          (dealerScore > playerScore && dealerScore <= BLACKJACK_VALUE) ||
          dealerScore === playerScore
        ) {
          setGameStatusWithDelay(DEALER_WINS);
        } else {
          setGameStatusWithDelay(PLAYER_WINS);
        }
      }
    }
  }, [gameState.dealerCards, gameState.playerCards, gameStatus, drawCard]);

  return [gameState, gameStatus, playerStand, playerHit]
};