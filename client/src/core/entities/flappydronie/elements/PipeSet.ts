import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from './Base';
import { Game } from './Game';
import { Pipe } from './Pipe';
import { fg_h, pipe_h, pipe_w } from '../sprites';

export class PipeSet extends Base {
  public movedCx = 0; // How far the PipeSet has been moved
  public scored = false; // Whether the PipeSet already scored points
  public moveSpeed: number;
  public distance: number; // Distance to the following PipeSet
  public gap: number; // Vertical Gap between the North and South Pipe
  public bottomOffset: number; // BottomOffset

  public readonly topPipe: Pipe;
  public readonly bottomPipe: Pipe;

  constructor(game: Game, config: PipeConfig) {
    super(game, { width: pipe_w, height: pipe_h * 3, ...config });
    config = defineConfig(config, {
      moveSpeed: 2,
      distance: 100,
      gap: 100,
      bottomOffset: 140 + fg_h,
    });

    this.moveSpeed = config.moveSpeed as any;
    this.distance = config.distance as any;
    this.gap = config.gap as any;
    this.bottomOffset = config.bottomOffset as any;

    // Generate Pipes
    const variationRange = 200;
    const randomYPos =
      this.game.canvasDimensions.height -
      (pipe_h + this.bottomOffset + variationRange * Math.random());
    this.topPipe = new Pipe(this.game, {
      cx: this.cx,
      cy: randomYPos,
      type: 'S',
    });
    this.bottomPipe = new Pipe(this.game, {
      cx: this.cx,
      cy: randomYPos + pipe_h + this.gap,
      type: 'N',
    });
  }

  public move() {
    super.move({ cx: this.cx - this.moveSpeed });
    this.movedCx += this.moveSpeed;

    // Move actual Pipes
    this.topPipe.move({ cx: this.cx });
    this.bottomPipe.move({ cx: this.cx });
  }
}

export type PipeConfig = {
  moveSpeed?: number;
  distance?: number;
  gap?: number;
  bottomOffset?: number;
} & BaseConfig;
