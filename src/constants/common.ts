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
} as const;

export const FetchStatus = {
  Idle: 'IDLE',
  Loading: 'LOADING',
  Succeeded: 'SUCCEEDED',
  Failed: 'FAILED',
} as const;

export const ACTIVE_COLOR = 'orange';
