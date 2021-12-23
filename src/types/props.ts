import { PropsWithChildren as ReactPropsWithChildren } from 'react';

export type PropsWithChildren = ReactPropsWithChildren<Record<never, never>>;

export type PropsWithClassName = {
  className?: string | string[];
};

export type ModalProps = {
  onClose: () => void;
};
