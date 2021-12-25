export const Direction = {
  Increase: 'increase',
  Decrease: 'decrease',
} as const;

export const KeyCode = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowRight: 'ArrowRight',
  ArrowLeft: 'ArrowLeft',
  Enter: 'Enter',
  NumpadEnter: 'NumpadEnter',
} as const;

export const FetchStatus = {
  Idle: 'IDLE',
  Loading: 'LOADING',
  Succeeded: 'SUCCEEDED',
  Failed: 'FAILED',
} as const;

export const ACTIVE_COLOR = 'orange';

export const DEBOUNCE_TIME = 300;

export const asyncDelay = (delay: number): Promise<void> => new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
