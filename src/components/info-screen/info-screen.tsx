import { CSSProperties } from 'react';
import { PropsWithChildren } from '../../types/props';

const INFO_SCREEN_STYLES: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

function InfoScreen({children}: PropsWithChildren): JSX.Element {
  return (
    <div style={INFO_SCREEN_STYLES}>
      {children}
    </div>
  );
}

export default InfoScreen;
