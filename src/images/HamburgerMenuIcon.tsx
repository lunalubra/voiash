import * as React from "react";

const SvgIcon = ({ forcedColor }: { forcedColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="31"
    height="23"
    fill="none"
    viewBox="0 0 31 23"
  >
    <path
      stroke={forcedColor || "#FFEEDC"}
      strokeLinecap="round"
      strokeOpacity="0.9"
      strokeWidth="3"
      d="M2 2h26.688M2 20.84h26.688M2 11.84h17.973"
    ></path>
  </svg>
);

export default SvgIcon;
