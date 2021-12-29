import { bg_h, bg_w } from '../../sprites';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

if (windowWidth >= bg_w) {
  windowWidth = bg_w;
  windowHeight = bg_h;
}

export const width = windowWidth;
export const height = windowHeight;
