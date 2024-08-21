const IconForm = ({
  className,
  fill = "none",
  stroke = "#000000",
}: {
  className?: string;
  fill?: string;
  stroke?: string;
}) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 48 48"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="3"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 14H40"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 22H42"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 30H42"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 22H24"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 30H24"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 6L14 42"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconForm;
