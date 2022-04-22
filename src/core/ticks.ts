export type Tick = number;

const dateToTick = (date: Date): Tick => Math.floor(date.getTime() / 10);

const EPOCH_TICK: Tick = dateToTick(new Date('2022-01-01'));

export const getTick = () => dateToTick(new Date()) - EPOCH_TICK;

export const calculateTicks = (t1: Tick, t2: Tick): Tick => t1 - t2;
