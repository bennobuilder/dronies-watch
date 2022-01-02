import { defineConfig, generateId } from '@agile-ts/core';
import { ga } from 'react-ga';
import { Game } from './Game';

export class Base {
  public id: string;

  public game: Game;

  public cx: number;
  public cy: number;
  public rotation: number;

  public width: number;
  public height: number;

  constructor(game: Game, config: BaseConfig = {}) {
    config = defineConfig(config, {
      width: 20,
      height: 20,
      cx: 0,
      cy: 0,
      rotation: 0,
    });

    this.game = game;

    this.width = config.width as any;
    this.height = config.height as any;
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

  public calculateCollision(object: CalculateCollisionObject): boolean {
    return (
      this.cx < object.cx + object.width &&
      this.cx + this.width > object.cx &&
      this.cy < object.cy + object.height &&
      this.height + this.cy > object.cy
    );
  }
}

export type BaseConfig = {
  cx?: number;
  cy?: number;
  rotation?: number;
  width?: number;
  height?: number;
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
