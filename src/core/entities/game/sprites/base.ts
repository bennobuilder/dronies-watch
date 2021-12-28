import { generateId } from '@agile-ts/core';

export class Base {
  id: string;

  cx: number;
  cy: number;
  rotation: number;

  constructor(cx: number, cy: number, rotation?: number) {
    this.cx = cx;
    this.cy = cy;
    this.rotation = rotation ?? 0;

    this.id = generateId();
  }
}
