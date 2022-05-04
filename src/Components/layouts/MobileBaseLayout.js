import React from "react";
import { useEffect } from "react";
import { Tween, Timeline } from "react-gsap";
import NavigateBack from "../actions/NavigateBack";
import FadeAnimation from "./../../Animations/FadeAnimation";
import Copyright from "./Copyright";
import Hr from "./Hr";
import TinySquare from "./TinySquare";

const MobileBaseLayout = ({
  navigation = true,
  backPath = "",
  backLabel = "",
  children,
  header,
  title = "",
  nopadding = false,
  isHome = false,
  isExplore = false,
  isEvent = false,
  isOwner = false,
  isDashboardSubView = false,
  line = true,
  view = "",
}) => {
  const determineLayoutHeight = () => {
    if (isHome) return "home-height";
    if (isEvent && isOwner) return "organizer-event-height";
    if (isEvent) return "event-height";
    if (isDashboardSubView) {
      if (view === "new-event") return "new-event-height";
    }
    return "min-h-screen";
  };

  return (
    <FadeAnimation fadeIn>
      <div
        className={`MobileBaseLayout overflow-hidden ${determineLayoutHeight()} flex flex-col relative  bg-dark-background`}
      >
        <div className="w-full m-0 sticky z-50 text-whites-light flex items-center justify-center">
          {header}
        </div>
        <div
          className={` Content flex-grow flex flex-col ${
            !nopadding && "pt-4 pb-1 px-3 xs:px-8"
          }`}
        >
          {navigation ? (
            <div className="z-50">
              <NavigateBack path={backPath} label={backLabel} />
            </div>
          ) : null}
          {title && (
            <div className="flex z-20 items-center mb-4 flex-grow-0 space-x-1 text-whites-light ">
              <TinySquare
                className="bg-primary-dark bg-opacity-80"
                size="medium"
              />
              <span
                className="text-sm pr-2.5 whitespace-nowrap overflow-x-scroll"
                style={{
                  maxWidth: "75%",
                }}
              >
                {title}
              </span>
              {line && (
                <Hr className="w-2/12 text-whites-light opacity-50 mt-0.5" />
              )}
            </div>
          )}
          <div className="flex flex-col flex-grow">{children}</div>

          <hr className="self-center w-95 text-whites-light opacity-5 mt-6 mb-2.5" />
        </div>
        <div className="pt-3 rounded-t-lg ">
          <Copyright withLogo color="none" />
        </div>
      </div>
    </FadeAnimation>
  );
};

export default MobileBaseLayout;
