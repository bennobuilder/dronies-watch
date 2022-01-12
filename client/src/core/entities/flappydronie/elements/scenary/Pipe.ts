import { Base, BaseConfig } from '../Base';
import { Game } from '../Game';
import { pipe_h, pipe_w } from '../../sprites';

export class Pipe extends Base {
  public readonly type: PipeType;

  constructor(game: Game, config: PipeConfig) {
    super(game, {
      ...config,
      collisionBox: { width: pipe_w, height: pipe_h, ...config.collisionBox },
    });
    this.type = config.type;
  }
}

export type PipeConfig = {
  type: PipeType;
} & BaseConfig;

type PipeType = 'S' | 'N';
