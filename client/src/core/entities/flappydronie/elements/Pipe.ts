import { Base, BaseConfig } from './Base';
import { Game } from './Game';
import { pipe_h, pipe_w } from '../sprites';

export class Pipe extends Base {
  public type: PipeType;

  constructor(game: Game, config: PipeConfig) {
    super(game, { width: pipe_w, height: pipe_h, ...config });
    this.type = config.type;
  }
}

export type PipeConfig = {
  type: PipeType;
} & BaseConfig;

type PipeType = 'S' | 'N';
