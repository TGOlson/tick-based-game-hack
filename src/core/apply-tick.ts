import { Tick, calculateTicks } from './ticks';
import { GameState } from '../game-state';

const applyTick = (lastTick: Tick, st: GameState): GameState => {
  let modifyableState = st;
  const ticks = calculateTicks(lastTick, st.lastTick);

  if (st.activeSkill) {
    const { levels } = st;
    const prevActiveSkillLevel = levels[st.activeSkill];

    const newLevels = { ...levels, [st.activeSkill]: prevActiveSkillLevel + ticks };
    modifyableState = { ...st, levels: newLevels };
  }

  return { ...modifyableState, lastTick };
};

export default applyTick;
