import { Base, BaseConfig } from './Base';

export class Pipe extends Base {
  public type: PipeType;
  public scored = false;

  constructor(config: PipeConfig) {
    super(config);
    this.type = config.type;
  }
}

type PipeConfig = {
  type: PipeType;
} & BaseConfig;

type PipeType = 'S' | 'N';
