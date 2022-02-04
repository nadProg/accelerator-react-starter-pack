function ModalDeleteCartItem(): JSX.Element {
  return (
    <>
      <h2 className="modal__header title title--medium title--red">
        Удалить этот товар?
      </h2>
      <div className="modal__info">
        <img
          className="modal__img"
          src="/img/guitar-2.jpg"
          width="67"
          height="137"
          alt="Честер bass"
        />
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">
            Гитара Честер bass
          </h3>
          <p className="modal__product-params modal__product-params--margin-11">
            Артикул: SO757575
          </p>
          <p className="modal__product-params">Электрогитара, 6 струнная</p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price">17 500 ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button className="button button--small modal__button">
          Удалить товар
        </button>
        <button className="button button--black-border button--small modal__button modal__button--right">
          Продолжить покупки
        </button>
      </div>
    </>
  );
}

export default ModalDeleteCartItem;
