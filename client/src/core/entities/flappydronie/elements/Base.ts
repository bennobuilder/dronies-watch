import { defineConfig, generateId } from '@agile-ts/core';
import { Game } from './Game';

export class Base {
  public id: string;

  public game: Game;

  protected _cx: number; // X Position
  protected _cy: number; // Y Position

  protected _ox: number; // Old X Position
  protected _oy: number; // Old Y Position

  protected _rx: number; // Render X
  protected _ry: number; // Render Y

  protected _vx: number; // Velocity X
  protected _vy: number; // Velocity Y

  protected readonly _mvx: number; // Max Velocity X
  protected readonly _mvy: number; // Max Velocity Y

  public gravity;

  protected _rotation: number;

  protected _collisionBox: CollisionBoxConfig;

  private readonly updateCallback?: (base: Base) => void;
  private readonly renderCallback?: (base: Base, lagOffset: number) => void;

  constructor(game: Game, config: BaseConfig = {}) {
    config = defineConfig(config, {
      collisionBox: {},
      cx: 0,
      cy: 0,
      vx: 0,
      vy: 0,
      rotation: 0,
      gravity: 0,
    });

    this.id = generateId();
    this.game = game;

    this._collisionBox = {
      width: 10,
      height: 10,
      offset: {
        x: 0,
        y: 0,
        ...(config.collisionBox?.offset || {}),
      },
      ...config.collisionBox,
    };
    this._cx = config.cx!;
    this._cy = config.cy!;
    this._ox = this._cx;
    this._oy = this._cy;
    this._vx = config.vx!;
    this._vy = config.vy!;
    this._mvx = 10;
    this._mvy = 7;
    this._rx = this._cx;
    this._ry = this._cy;
    this._rotation = config.rotation!;
    this.gravity = config.gravity!;

    this.updateCallback = config.updateCallback;
    this.renderCallback = config.renderCallback;
  }

  public move(newPos: MoveConfig) {
    newPos = defineConfig(newPos, {
      cx: this._cx,
      cy: this._cy,
    });

    this.cx = newPos.cx!;
    this.cy = newPos.cy!;
  }

  public rotate(rotation: number) {
    this._rotation = rotation;
  }

  public calculateCollision(object: Base): boolean;
  public calculateCollision(object: CalculateCollisionObject): boolean;
  public calculateCollision(object: CalculateCollisionObject | Base): boolean {
    let finalObject: CalculateCollisionObject;
    if (object instanceof Base) {
      finalObject = {
        cx: object._cx + object._collisionBox.offset.x,
        cy: object._cy + object._collisionBox.offset.y,
        width: object._collisionBox.width,
        height: object._collisionBox.height,
      };
    } else {
      finalObject = object;
    }

    return (
      this._cx < finalObject.cx + finalObject.width &&
      this._cx + this._collisionBox.width > finalObject.cx &&
      this._cy < finalObject.cy + finalObject.height &&
      this._collisionBox.height + this._cy > finalObject.cy
    );
  }

  public update() {
    // Apply Gravity
    this._vy += this.gravity;

    // Apply Velocity
    if (this._vy > this._mvy) this._vy = this._mvy;
    if (this._vx > this._mvx) this._vx = this._mvx;
    this.move({ cy: this._cy + this._vy, cx: this._cx + this._vx });

    if (this.updateCallback != null) this.updateCallback(this);
  }

  public render(lagOffset = 1) {
    // Calculate the to render (visible) position
    this._rx = (this._cx - this._ox) * lagOffset + this._ox;
    this._ry = (this._cy - this._oy) * lagOffset + this._oy;

    if (this.renderCallback != null) this.renderCallback(this, lagOffset);
  }

  public get cx(): number {
    return this._cx;
  }
  public set cx(value: number) {
    this._ox = this._cx;
    this._cx = value;
  }

  public get cy(): number {
    return this._cy;
  }
  public set cy(value: number) {
    this._oy = this._cy;
    this._cy = value;
  }

  public get ox(): number {
    return this._ox;
  }
  public get oy(): number {
    return this._oy;
  }

  public get rx(): number {
    return this._rx;
  }
  public get ry(): number {
    return this._ry;
  }

  public get vx(): number {
    return this._vx;
  }
  public get vy(): number {
    return this._vy;
  }

  public get rotation(): number {
    return this._rotation;
  }

  public get collisionBox(): CollisionBoxConfig {
    return this._collisionBox;
  }
}

export type BaseConfig = {
  cx?: number;
  cy?: number;
  vx?: number;
  vy?: number;
  rotation?: number;
  gravity?: number;

  updateCallback?: (base: Base) => void;
  renderCallback?: (base: Base, lagOffset: number) => void;

  collisionBox?: Partial<CollisionBoxConfig>;
};

type CollisionBoxConfig = {
  width: number;
  height: number;
  offset: { x: number; y: number };
};

type MoveConfig = {
  cx?: number;
  cy?: number;
};

type CalculateCollisionObject = {
  cx: number;
  cy: number;
  width: number;
  height: number;
};
