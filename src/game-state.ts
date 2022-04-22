import { Tick } from './core/ticks';

export enum Skill {
  WOODCUTTING = 'WOODCUTTING',
  // MINING = 'MINING',
  // CRAFTING = 'CRAFTING',
}

export type GameState = {
  activeSkill?: Skill,
  lastTick: Tick,
  levels: {}
}

export const createEmptyGameState = (lastTick: Tick): GameState => ({
  activeSkill: null,
  lastTick,
  levels: {
    WOODCUTTING: 0,
  },
});
