type RatingProps = {
  value: number;
};

const MAX_VALUE = 5;

const STAR = 'star';

const XLinkRef = {
  Full: '#icon-full-star',
  Empty: '#icon-star',
};

function Rating({ value }: RatingProps): JSX.Element {
  return (
    <>
      {new Array(MAX_VALUE).fill(STAR).map((star, index) => {
        const id = `${star}-${index}`;
        const xLinkHref = value < index + 1 ? XLinkRef.Empty :  XLinkRef.Full;

        return (
          <svg key={id} width="12" height="11" aria-hidden="true">
            <use xlinkHref={xLinkHref} />
          </svg>
        );
      })}
    </>
  );
}

export default Rating;
