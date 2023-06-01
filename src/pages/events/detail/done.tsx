import { useStyleContext } from '../../../contexts/AppContextProvider';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import Font from '../../../styles/Font';

const done = () => {
  const { Color } = useStyleContext();
  return (
    <>
      <svg
        width="144"
        height="144"
        viewBox="0 0 144 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="144" height="144" rx="72" fill="#1852FD" />
        <path d="M53.7826 107L39 100L79 93L53.7826 107Z" fill="#1644CC" />
        <g clip-path="url(#clip0_192_24076)">
          <path
            d="M80.3535 52.3468L81.8846 81.3597L123.947 44.0273L80.3535 52.3468Z"
            fill="#E5E9EA"
          />
          <path
            d="M19 55.2511L40.9576 70.2609L124 44L19 55.2511Z"
            fill="#F5F6F7"
          />
          <path
            d="M52.397 79.2236L124 44L74.4324 99L52.397 79.2236L38.4355 97.1318L41.7435 70.4806"
            fill="#F5F6F7"
          />
          <path
            d="M61.8535 87.7092L37.6895 98.3856L52.3972 79.2227L61.8535 87.7092Z"
            fill="#AEB1B4"
          />
          <path
            d="M123.872 44.0625L52.5693 79.3776L37.6895 98.3859L40.9575 70.2603L123.872 44.0625Z"
            fill="#DCDEE0"
          />
        </g>
        <defs>
          <clipPath id="clip0_192_24076">
            <rect
              width="105"
              height="55"
              fill="white"
              transform="translate(19 44)"
            />
          </clipPath>
        </defs>
      </svg>
      <span
        style={{
          ...Font.title.display2,
          color: Color.text.primary,
          marginTop: '32px',
        }}
      >
        행사신청이 완료되었습니다.
      </span>
      <div></div>
    </>
  );
};

export default withPageLoadedEffect(done);
