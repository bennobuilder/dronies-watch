import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from '../Base';
import { Game } from '../Game';
import { Pipe } from './Pipe';
import { fg_h, pipe_h, pipe_w } from '../../sprites';

export class PipeSet extends Base {
  public _movedCx = 0; // How far the pipe set has been moved
  public scored = false; // Whether the pipe set already scored points
  public readonly distance: number; // Distance to the following pipe set
  public readonly gap: number; // Vertical gap between the North and South pipe
  public readonly bottomOffset: number;

  public readonly topPipe: Pipe;
  public readonly bottomPipe: Pipe;

  constructor(game: Game, config: PipeConfig) {
    super(game, {
      ...config,
      vx: 2, // Move speed
      collisionBox: {
        width: pipe_w,
        height: pipe_h * 3,
        ...config.collisionBox,
      },
    });
    config = defineConfig(config, {
      distance: 100,
      gap: 100,
      bottomOffset: 140 + fg_h,
    });
    this.distance = config.distance!;
    this.gap = config.gap!;
    this.bottomOffset = config.bottomOffset!;

    // Generate Pipes
    const variationRange = 200;
    const randomYPos =
      this.game.canvasDimensions.height -
      (pipe_h + this.bottomOffset + variationRange * Math.random());
    this.topPipe = new Pipe(this.game, {
      cx: this._cx,
      cy: randomYPos,
      type: 'S',
    });
    this.bottomPipe = new Pipe(this.game, {
      cx: this._cx,
      cy: randomYPos + pipe_h + this.gap,
      type: 'N',
    });
  }

  public update() {
    this.move({ cx: this._cx - this._vx });
    this._movedCx += this._vx;

    // Move actual Pipes
    this.topPipe.move({ cx: this._cx });
    this.bottomPipe.move({ cx: this._cx });
  }

  public render(lagOffset: number = 1) {
    this.topPipe.render(lagOffset);
    this.bottomPipe.render(lagOffset);
  }

  public get movedCx(): number {
    return this._movedCx;
  }
}

export type PipeConfig = {
  distance?: number;
  gap?: number;
  bottomOffset?: number;
} & BaseConfig;
