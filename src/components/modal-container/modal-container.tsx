import { useRef } from 'react';
import classNames from 'classnames';
import { useModal } from '../../hooks/use-modal';

import { ModalProps, PropsWithChildren } from '../../types/props';

type ModalContainerProps = PropsWithChildren & ModalProps & {
  isActive: boolean;
  testId?: string;
};

function ModalContainer({ onClose, children, testId, isActive }: ModalContainerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useModal(isActive, rootRef, onClose);

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
