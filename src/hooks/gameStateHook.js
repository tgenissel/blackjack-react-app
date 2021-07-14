import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGameState,
  setGameStatus,
  setGameStatusWithDelay,
  setPlayer,
  drawCard
} from '../features/cards/cardsSlice';
import getScore from '../utils/get-score';
import { STATUSES, PLAYERS, BLACKJACK_VALUE, DEALER_MIN_VALUE } from '../constants';

const { PLAYER_TURN, DEALER_TURN, PLAYER_WINS, BLACKJACK, DEALER_WINS } = STATUSES;

const { PLAYER, DEALER } = PLAYERS;

export function useGameState(initialState) {
  const dispatch = useDispatch();
  const dealerCards = useSelector((state) => state.cards.dealerCards);
  const playerCards = useSelector((state) => state.cards.playerCards);
  const gameStatus = useSelector((state) => state.cards.gameStatus);

  const playerStand = () => {
    dispatch(setGameStatus(DEALER_TURN));
  };

  const playerHit = () => {
    dispatch(setPlayer(PLAYER));
    dispatch(drawCard());
  };

  useEffect(() => {
    const dealerScore = getScore(dealerCards);
    const playerScore = getScore(playerCards);

    if (gameStatus === PLAYER_TURN) {
      if (playerScore === BLACKJACK_VALUE) {
        if (playerCards.length === 2) {
          dispatch(setGameStatusWithDelay(BLACKJACK));
        } else {
          dispatch(setGameStatusWithDelay(PLAYER_WINS));
        }
      } else if (playerScore > BLACKJACK_VALUE) {
        dispatch(setGameStatusWithDelay(DEALER_WINS));
      }
    } else if (gameStatus === DEALER_TURN) {
      if (dealerScore < DEALER_MIN_VALUE) {
        dispatch(setPlayer(DEALER));
        dispatch(drawCard());
      } else {
        if ((dealerScore > playerScore && dealerScore <= BLACKJACK_VALUE) || dealerScore === playerScore) {
          dispatch(setGameStatusWithDelay(DEALER_WINS));
        } else {
          dispatch(setGameStatusWithDelay(PLAYER_WINS));
        }
      }
    }
  }, [dealerCards, playerCards, gameStatus, dispatch]);

  // newGame
  useEffect(() => {
    dispatch(setGameState(initialState));
    dispatch(setGameStatus(PLAYER_TURN));
  }, [initialState.deckId, dispatch]);

  return [{ dealerCards, playerCards }, gameStatus, playerStand, playerHit];
}
