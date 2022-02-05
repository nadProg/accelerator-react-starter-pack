import { useRef } from 'react';
import classNames from 'classnames';

import { ModalProps, PropsWithChildren } from '../../types/props';
import { useScrollBlock } from '../../hooks/use-scroll-block';
import { useEscape } from '../../hooks/use-escape';
import { useFocusLoop } from '../../hooks/use-focus-loop';

type ModalContainerProps = PropsWithChildren &
  ModalProps & {
    isActive: boolean;
    success?: boolean;
    testId?: string;
    noScrollBlock?: boolean;
  };

function ModalContainer({
  onClose,
  children,
  testId,
  isActive,
  success,
  noScrollBlock,
}: ModalContainerProps) {
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
        'modal--success': success,
      })}
      data-testid={testId}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onClose}></div>
        <div className="modal__content">
          {children}
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
