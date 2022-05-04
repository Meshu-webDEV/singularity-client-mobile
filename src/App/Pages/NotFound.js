import React from "react";
import { Tween } from "react-gsap";
import { useHistory } from "react-router-dom";

// Components
import Button from "../../Components/actions/Button";
import ButtonLink from "../../Components/actions/ButtonLink";
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";

// Images
import LogoBR from "../../Images/LogoBR";
import NotFoundArt from "../../Images/NotFoundArt";

const NotFound = () => {
  let history = useHistory();

  // handlers
  const handleGoHome = () => {
    return history.replace("/");
  };
  const handleGoEvents = () => {
    return history.replace("/explore");
  };
  return (
    <MobileBaseLayout header={<Header />} navigation={false}>
      <div className="flex-grow w-full relative flex flex-col space-y-12 items-center justify-center px-4">
        <NotFoundArt className="" />
        <div className="flex space-x-3 justify-center text-xs">
          <ButtonLink
            className="text-sm text-whites-light px-2.5 py-1"
            text="Dashboard"
            variant="dark"
            href="/dashboard"
          />
          <ButtonLink
            href="/explore"
            className="text-whites-light text-xs font-light tracking-tight opacity-90"
            textOnly
            text="Explore events"
          />
        </div>
      </div>
    </MobileBaseLayout>
  );
};

export default NotFound;
