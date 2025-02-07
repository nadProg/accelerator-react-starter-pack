import InfoScreen from '../info-screen/info-screen';
import styles from './loader.module.css';

function Loader(): JSX.Element {
  return (
    <InfoScreen>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={styles.Loader} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <rect x="15" y="30" width="10" height="40" fill="#222222">
          <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.6"></animate>
        </rect>
        <rect x="35" y="30" width="10" height="40" fill="#3a3a3a">
          <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.4"></animate>
        </rect>
        <rect x="55" y="30" width="10" height="40" fill="#8f8e8e">
          <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.2"></animate>
        </rect>
        <rect x="75" y="30" width="10" height="40" fill="#b1aeae">
          <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-1"></animate>
        </rect>
      </svg>
    </InfoScreen>
  );
}

export default Loader;
