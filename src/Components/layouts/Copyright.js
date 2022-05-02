import MobileLogo from "./MobileLogo";

const Copyright = ({ withLogo = false, color = "primary" }) => {
  if (withLogo)
    return (
      <div className="w-full py-1 flex flex-col justify-center items-center text-whites-dark font-light text-xxs tracking-tight">
        <span>
          <MobileLogo size="tiny" color={color} />
        </span>
        <span>
          Copyright © 2022 -{" "}
          <span>
            <a
              className="underline"
              target="_blank"
              href="https://www.meshu-web.dev"
            >
              meshu-web.dev
            </a>
          </span>{" "}
          - All rights reserved
        </span>
      </div>
    );

  return (
    <div className="absolute bottom-0.5 w-full py-1 flex flex-col justify-center text-whites-dark font-light text-xxs tracking-wider">
      <span>
        Copyright © 2022 -{" "}
        <span>
          <a
            className="underline"
            target="_blank"
            href="https://www.meshu-web.dev"
          >
            meshu-web.dev
          </a>
        </span>{" "}
        - All rights reserved
      </span>
    </div>
  );
};

export default Copyright;
