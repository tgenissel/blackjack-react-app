import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const blackjackApi = createApi({
  reducerPath: 'blackjackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://deckofcardsapi.com/api/' }),
  entityTypes: ['Cards'],
  endpoints: (builder) => ({
    newShuffledDeck: builder.mutation({
      query: (deckCount) => {
        const deck_count = deckCount ?? 6;

        return `deck/new/shuffle?deck_count=${deck_count}`;
      },
    }),
    drawCardsFromDeck: builder.mutation({
      query: ({ deckId, count = 1 }) => `deck/${deckId}/draw/?count=${count}`,
    }),
    shuffleCardsFromDeck: builder.mutation({
      query: ({ deckId }) => `deck/${deckId}/shuffle/`,
    }),
  }),
})

// Export hooks for usage in functional components
export const { useNewShuffledDeckMutation, useDrawCardsFromDeckMutation, useShuffleCardsFromDeckMutation } = blackjackApi;

// Possible exports
export const { endpoints: { newShuffledDeck, drawCardsFromDeck, shuffleCardsFromDeck } } = blackjackApi;

export default blackjackApi;