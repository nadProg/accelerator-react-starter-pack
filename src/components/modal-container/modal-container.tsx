import { useRef } from 'react';
import classNames from 'classnames';

import { ModalProps, PropsWithChildren } from '../../types/props';
import { useScrollBlock } from '../../hooks/use-scroll-block';
import { useEscape } from '../../hooks/use-escape';
import { useFocusLoop } from '../../hooks/use-focus-loop';

type ModalContainerProps = PropsWithChildren & ModalProps & {
  isActive: boolean;
  testId?: string;
  noScrollBlock?: boolean;
};

function ModalContainer({ onClose, children, testId, isActive, noScrollBlock }: ModalContainerProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const isScrollBlock = noScrollBlock ? false : isActive;

  useScrollBlock(isScrollBlock);
  useEscape(isActive, onClose);
  useFocusLoop(isActive, rootRef);

  return (
    <div
      ref={rootRef}
      className={classNames('modal', {
        'is-active': isActive,
      })}
      data-testid={testId}
    >
      <div className="modal__wrapper">
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
