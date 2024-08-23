import IconProps from "./iconInterface";

const IconAsk = ({ className, fill = "#111918", stroke }: IconProps) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      fill={fill}
      className={className}
    >
      <path
        stroke={stroke}
        d="M4,4v20h14l0,6l6-6h4V4H4z M26,22h-2.828L20,25.172L20,22H6V6h20V22z M14,12h-2
   c0-1.607,1.065-4,4-4s4,2.393,4,4c0,1.41-0.819,3.423-3,3.897V17h-2v-3h1c1.903,0,2-1.666,2-2c-0.008-0.464-0.174-2-2-2
   C14.097,10,14,11.666,14,12z M15,18h2v2h-2V18z"
      />
    </svg>
  );
};

export default IconAsk;
