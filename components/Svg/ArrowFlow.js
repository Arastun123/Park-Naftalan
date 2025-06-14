export default function ArrowFlow() {
  return (
    <svg
      width="400"
      height="342"
      viewBox="0 0 400 342"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="arrowMask"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="400"
        height="342"
      >
        <path
          d="M391 342L399.36 326.831L382.043 327.175L391 342ZM0 2L-0.0154505 3.49992C63.6594 4.15583 158.701 21.3287 238.951 70.4108C319.132 119.451 384.537 200.326 389.233 328.563L390.732 328.508L392.231 328.453C387.493 199.047 321.406 117.325 240.516 67.8515C159.694 18.4195 64.0871 1.16007 0.0154505 0.50008L0 2Z"
          fill="white"
        />
      </mask>

      <g mask="url(#arrowMask)">
        <rect x="0" y="0" width="403" height="0" fill="#D9D9D9">
          <animate
            attributeName="height"
            values="0; 354; 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  );
}
