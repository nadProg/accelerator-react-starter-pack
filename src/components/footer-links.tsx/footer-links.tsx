import { NavLink } from 'react-router-dom';

function FooterLinks() {
  return (
    <section className="footer__nav-section footer__nav-section--links">
      <h2 className="footer__nav-title">Информация</h2>
      <ul className="footer__nav-list">
        <li className="footer__nav-list-item">
          <NavLink className="link" to="#">Где купить?</NavLink>
        </li>
        <li className="footer__nav-list-item">
          <NavLink className="link" to="#">Блог</NavLink>
        </li>
        <li className="footer__nav-list-item">
          <NavLink className="link" to="#">Вопрос - ответ</NavLink>
        </li>
        <li className="footer__nav-list-item">
          <NavLink className="link" to="#">Возврат</NavLink>
        </li>
        <li className="footer__nav-list-item">
          <NavLink className="link" to="#">Сервис-центры</NavLink>
        </li>
      </ul>
    </section>
  );
}

export default FooterLinks;
