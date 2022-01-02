import { defineConfig, generateId } from '@agile-ts/core';
import { ga } from 'react-ga';
import { Game } from './Game';

export class Base {
  public id: string;

  public game: Game;

  public cx: number;
  public cy: number;
  public rotation: number;

  public collisionBox: CollisionBoxConfig;

  constructor(game: Game, config: BaseConfig = {}) {
    config = defineConfig(config, {
      collisionBox: {},
      cx: 0,
      cy: 0,
      rotation: 0,
    });

    this.game = game;

    this.collisionBox = {
      width: 10,
      height: 10,
      offset: {
        x: 0,
        y: 0,
        ...(config.collisionBox?.offset || {}),
      },
      ...config.collisionBox,
    };
    this.cx = config.cx as any;
    this.cy = config.cy as any;
    this.rotation = config.rotation as any;

    this.id = generateId();
  }

  public move(newPos: MoveConfig) {
    newPos = defineConfig(newPos, {
      cx: this.cx,
      cy: this.cy,
    });

    this.cx = newPos.cx as any;
    this.cy = newPos.cy as any;
  }

  public rotate(rotation: number) {
    this.rotation = rotation;
  }

  public calculateCollision(object: Base): boolean;
  public calculateCollision(object: CalculateCollisionObject): boolean;
  public calculateCollision(object: CalculateCollisionObject | Base): boolean {
    let finalObject: CalculateCollisionObject;
    if (object instanceof Base) {
      finalObject = {
        cx: object.cx + object.collisionBox.offset.x,
        cy: object.cy + object.collisionBox.offset.y,
        width: object.collisionBox.width,
        height: object.collisionBox.height,
      };
    } else {
      finalObject = object;
    }

    return (
      this.cx < finalObject.cx + finalObject.width &&
      this.cx + this.collisionBox.width > finalObject.cx &&
      this.cy < finalObject.cy + finalObject.height &&
      this.collisionBox.height + this.cy > finalObject.cy
    );
  }
}

export type BaseConfig = {
  cx?: number;
  cy?: number;
  rotation?: number;

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
