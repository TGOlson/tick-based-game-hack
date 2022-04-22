import { emitKeypressEvents } from 'readline';

import {
  GameState, Skill, createEmptyGameState,
} from './src/game-state';
import { Tick, getTick } from './src/core/ticks';
import applyTick from './src/core/apply-tick';

const log = (...xs: any) => console.log(...xs); // eslint-disable-line no-console

type GameAction =
  { name: 'ApplyTick', value: Tick} |
  { name: 'ChangeSkill', value: Skill}

const runAction = (st: GameState, action: GameAction): GameState => {
  if (action.name === 'ApplyTick') {
    return applyTick(action.value, st);
  } if (action.name === 'ChangeSkill') {
    return { ...st, activeSkill: action.value };
  }
  log('Unknown action', action);
  return st;
};

const runActions = (st: GameState, actions: [GameAction]): GameState => actions.reduce(runAction, st);

const printGame = (st: GameState) => log(st);

const setupInputHandler = (cb) => {
  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    let actions = [];
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else if (key.name === 'return') {
      actions = [...actions, { name: 'ApplyTick', value: getTick() }];
    } else if (key.name === 's') {
      actions = [...actions, { name: 'ApplyTick', value: getTick() }];
      actions = [...actions, { name: 'ChangeSkill', value: Skill.WOODCUTTING }];
    } else {
      log(`You pressed the "${str}" key`);
      log();
      log(key);
      log();
    }

    cb(actions);
  });
};

const runLoop = () => {
  let gameState = createEmptyGameState(getTick());
  printGame(gameState);

  setupInputHandler((actions: [GameAction]) => {
    log('actions', actions);
    log('prev state', gameState);
    const nextState = runActions(gameState, actions);
    log('next state', nextState);

    gameState = nextState;
  });
};

runLoop();

// const runLoop = () => {
//   const t1 =
// }
