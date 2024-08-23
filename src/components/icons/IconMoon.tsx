const Moon = ({
  className,
  fill = "currentColor",
  stroke,
}: {
  className?: string;
  fill?: string;
  stroke?: string;
}) => (
  <svg
    width="24px"
    height="24px"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={fill}
    className={`group:hover:text-gray-100 ${className}`}
  >
    <path
      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
      stroke={stroke}
    />
  </svg>
);

export default Moon;
