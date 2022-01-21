import { createComputed, createState } from '@agile-ts/core';
import { CardMeta } from './game.types';

// Assets
import Front1Img from '../../../assets/games/memory/front1.png';
import Front2Img from '../../../assets/games/memory/front2.png';
import Front3Img from '../../../assets/games/memory/front3.png';
import Front4Img from '../../../assets/games/memory/front4.png';
import Front5Img from '../../../assets/games/memory/front5.png';
import Front6Img from '../../../assets/games/memory/front6.png';
// import Front7Img from '../../../assets/games/memory/front7.png';

export const CARDS_META: CardMeta[] = [
  {
    type: 'Front1',
    image: Front1Img,
  },
  {
    type: 'Front2',
    image: Front2Img,
  },
  {
    type: 'Front3',
    image: Front3Img,
  },
  {
    type: 'Front4',
    image: Front4Img,
  },
  {
    type: 'Front5',
    image: Front5Img,
  },
  {
    type: 'Front6',
    image: Front6Img,
  },
];

// Game Properties
export const HIGH_SCORE = createState(0).persist({ key: 'memory-high-score' });
export const LATEST_SCORE = createState(0).persist({
  key: 'memory-latest-score',
});
export const CARDS = createState<CardMeta[]>(CARDS_META.concat(CARDS_META));
export const OPEN_CARDS = createState<number[]>([]);
export const OPEN_CARD_TIMEOUT = createState<NodeJS.Timeout | null>(null);
export const CLEARED_CARDS = createState<Record<string, boolean>>({});
export const MOVES_COUNT = createState(0);
export const DISABLE_ALL_CARDS = createState(false);
export const TIME_PLAYED = createState(0);
export const MAX_TIME = createState(45); // s
export const IS_PLAYING = createComputed(() => TIME_PLAYED.value > 0);
