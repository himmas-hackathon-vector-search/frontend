import IconProps from "./iconInterface";

const IconArrowDown = ({
  className,
  fill = "#000000",
  stroke = "none",
}: IconProps) => {
  return (
    <svg
      fill={fill}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="800px"
      height="800px"
      viewBox="0 0 8 8"
      enableBackground="new 0 0 8 8"
      xmlSpace="preserve"
      className={className}
      stroke={stroke}
    >
      <rect
        x="2.709"
        y="4.855"
        transform="matrix(0.7071 -0.7072 0.7072 0.7071 -2.3841 5.4202)"
        width="5.283"
        height="1.466"
      />
      <rect x="3.164" y="0.021" width="1.683" height="6.375" />
      <rect
        x="0.015"
        y="4.861"
        transform="matrix(-0.7073 -0.7069 0.7069 -0.7073 0.5815 11.4283)"
        width="5.284"
        height="1.465"
      />
    </svg>
  );
};

export default IconArrowDown;
