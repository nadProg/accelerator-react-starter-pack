import { PropsWithChildren } from '../../types/props';
import styles from './info-screen.module.css';

function InfoScreen({children}: PropsWithChildren): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

export default InfoScreen;
