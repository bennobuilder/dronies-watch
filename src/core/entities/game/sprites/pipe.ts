import { Base } from './base';

export class Pipe extends Base {
  type: 'S' | 'N';

  constructor(cx: number, cy: number, type: 'S' | 'N') {
    super(cx, cy, 0);
    this.type = type;
  }
}
