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
  Minus: 'Minus',
  NumpadSubtract: 'NumpadSubtract',
  Escape: 'Escape',
} as const;

export const FetchStatus = {
  Idle: 'IDLE',
  Loading: 'LOADING',
  Succeeded: 'SUCCEEDED',
  Failed: 'FAILED',
} as const;

export const DEBOUNCE_TIME = 300;

export const RUSSIAN_LOCALE = 'ru-RU';
