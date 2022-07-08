const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "0 auto",
        backGround: "none",
        display: "block",
        shapeRendering: "auto",
      }}
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#9f0013"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="2.6315789473684212s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"></animateTransform>
      </circle>
    </svg>
  );
};

export default Spinner;
