import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col space-y-2 justify-center items-center font-light text-xs text-whites-light opacity-70">
      <a
        href="mailto:contact@singularity.events"
        className="max-w-min whitespace-nowrap self-center bg-grays-light rounded-md shadow-sm px-4 py-1.5 text-whites-light flex space-x-4 justify-center items-center"
      >
        <span>Contact us</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      </a>
      <span className="text-3xs">contact@singularity.events</span>
    </div>
  );
};

export default Footer;
