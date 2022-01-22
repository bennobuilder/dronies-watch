import { CardMeta } from './game.types';
import {
  CARDS,
  CARDS_META,
  CLEARED_CARDS,
  HIGH_SCORE,
  MOVES_COUNT,
  OPEN_CARD_TIMEOUT,
  OPEN_CARDS,
  DISABLE_ALL_CARDS,
  TIME_PLAYED,
  MAX_TIME,
  IS_PLAYING,
  LATEST_SCORE,
  GAME_TYPE,
} from './game.controller';
import { sendHighScore } from '../games';
import { CURRENT_USER } from '../user';
import { SCORE } from '../flappydronie';

export const startGame = () => {
  TIME_PLAYED.interval((v) => {
    const maxTime = MAX_TIME.value;
    if (v >= maxTime) {
      endGame();
      return maxTime;
    }

    return v + 1;
  }, 1000);
};

export const endGame = () => {
  const highScore = HIGH_SCORE.value;
  const totalCardInGame = CARDS.value.length;
  const moves = MOVES_COUNT.value;
  const maxTime = MAX_TIME.value;
  const timePlayed = TIME_PLAYED.value;
  const timeLeft = maxTime - timePlayed;
  const cardsLeft =
    totalCardInGame - Object.keys(CLEARED_CARDS.value).length * 2;

  // End Timer
  TIME_PLAYED.clearInterval();

  console.log('Game Information', {
    timePlayed,
    maxTime,
    cardsLeft,
    moves,
    timeLeft,
  });

  // Calculate Score
  let tilesBonus = (totalCardInGame - cardsLeft) * 20; // 20 points for each successful flipped card
  let timeBonus = timeLeft * 8; // 8 points for each second left
  let triesBonus = (48 - moves) * 10; // (deduct) 10 points for each try

  console.log('Game Bonuses', {
    tilesBonus,
    timeBonus,
    triesBonus,
  });

  if (tilesBonus < 0) tilesBonus = 0;
  if (timeBonus < 0) timeBonus = 0;
  if (triesBonus < 0) triesBonus = 0;

  const finalScore = tilesBonus + timeBonus + triesBonus;
  console.log({ finalScore, highScore });
  if (finalScore > highScore) HIGH_SCORE.set(finalScore);

  // Send score to backend if a user is authenticated
  if (CURRENT_USER.value != null) sendHighScore(SCORE.value, GAME_TYPE);

  LATEST_SCORE.set(finalScore);
  resetGame();
};

export const resetGame = () => {
  CLEARED_CARDS.set({});
  OPEN_CARDS.set([]);
  MOVES_COUNT.set(0);
  DISABLE_ALL_CARDS.set(false);
  TIME_PLAYED.set(0);

  // Reshuffle Cards
  CARDS.set(shuffleCards(CARDS_META.concat(CARDS_META)));
};

export const shuffleCards = (cards: CardMeta[]) => {
  for (let i = cards.length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temp;
  }

  return cards;
};

export const checkGameCompletion = () => {
  const clearedCards = CLEARED_CARDS.value;

  if (Object.keys(clearedCards).length === CARDS_META.length) endGame();
};

export const evaluate = () => {
  const openCards = OPEN_CARDS.value;
  const cards = CARDS.value;
  if (openCards.length !== 2) return;
  const [first, second] = openCards;

  DISABLE_ALL_CARDS.set(false);

  // Check if Card guess was correct
  if (cards[first].type === cards[second].type) {
    CLEARED_CARDS.set((prev) => ({ ...prev, [cards[first].type]: true }));
    OPEN_CARDS.set([]);

    // Check completion of the Game (-> whether all cards where correctly flipped)
    checkGameCompletion();

    return;
  }

  // This is to flip the cards back after 500ms duration
  OPEN_CARD_TIMEOUT.set(
    setTimeout(() => {
      OPEN_CARDS.set([]);
    }, 500),
  );
};

export const flipCard = (index: number) => {
  const openCards = OPEN_CARDS.value;
  const timeout = OPEN_CARD_TIMEOUT.value;

  // Start Game if not done yet
  if (!IS_PLAYING.value) startGame();

  // Handle second opened Card
  if (openCards.length === 1) {
    OPEN_CARDS.set((prev) => [...prev, index]);
    MOVES_COUNT.set((prev) => prev + 1);

    // Disable all Cards to not select another one while evaluating the correctness
    DISABLE_ALL_CARDS.set(true);

    // Evaluate Result (after 300ms for a smooth animation)
    setTimeout(evaluate, 300);

    return;
  }

  // Handle first opened Card
  // Clear open Card Timeout in case another Card was selected
  if (timeout != null) {
    clearTimeout(timeout);
    OPEN_CARD_TIMEOUT.reset();
  }
  OPEN_CARDS.set([index]);
};

export const isFlipped = (index: number) => OPEN_CARDS.value.includes(index);

export const isInactive = (card: CardMeta) =>
  Boolean(CLEARED_CARDS.value[card.type]);

export const getScoreTweetUri = (score: number) =>
  `https://twitter.com/intent/tweet?text=I%20just%20played%20Memory%20Dronie%20and%20managed%20to%20score%20${score}%21%20Can%20you%20beat%20me%3F%20Try%20it%20here%20https%3A//dronies.watch/lab%20and%20train%20your%20@DronieNFT%21`;
