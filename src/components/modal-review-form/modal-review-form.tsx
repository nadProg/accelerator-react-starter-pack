import { ModalProps, PropsWithChildren } from '../../types/props';

type ModalReviewFormProps = ModalProps &
  PropsWithChildren & {
    title: string;
  };

function ModalReviewForm({
  children,
  title,
}: ModalReviewFormProps): JSX.Element {
  return (
    <>
      <h2 className="modal__header modal__header--review title title--medium">
        Оставить отзыв
      </h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">
        {title}
      </h3>
      {children}
    </>
  );
}

export default ModalReviewForm;
