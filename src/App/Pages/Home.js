import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import MobileLogo from "../../Components/layouts/MobileLogo";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import Header from "../../Components/layouts/Header";
import Nightbot from "../../Images/Nightbot";
import Discord from "../../Images/Discord";

// GSAP
import { Tween, Timeline, Reveal } from "react-gsap";

// Context
import ModalContext from "../../Context/Modal/ModalContext";

// Context
import LogoBR from "../../Images/LogoBR";
import Hr from "../../Components/layouts/Hr";
import Button from "../../Components/actions/Button";
import ButtonLink from "../../Components/actions/ButtonLink";

const Home = () => {
  const { setModalComponent, setModal } = useContext(ModalContext);

  const handleLearnNightbot = () => {
    setModalComponent(<div className="text-whites-light">Hey</div>);
    setModal();
  };

  return (
    <MobileBaseLayout header={<Header />} navigation={false} nopadding isHome>
      <div className="h-full w-full space-y-20 flex  flex-col">
        <div
          className="flex z-10 flex-col space-y-4 justify-center w-full px-9 2xs:px-14"
          style={{
            height: "90vh",
          }}
        >
          <div className="relative text-primary-light flex flex-col items-center">
            <p className="uppercase slide-in-left text-5xl font-black text-primary-light">
              singularity
            </p>
            <p className="text-whites-light self-start xs:self-center xs:w-8/12 tracking-wider text-xs">
              Organize & Manage tournaments, events, and scrims. Connect your
              events with <span className="font-bold">Twitch</span> &{" "}
              <span className="font-bold">Discord</span>. Reach your viewers
              effortlessly.
            </p>
          </div>
          <div className="call-to-action self-end max-w-min flex space-y-3 flex-col justify-end text-whites-light">
            <Link to="/dashboard/new-event" className="flex self-end shadow-md">
              <span className="rounded-l-lg text-sm tracking-tight flex justify-center items-center  bg-dark-backgroundDarker py-1 px-4 uppercase whitespace-nowrap">
                Create a new event
              </span>

              <div className="rounded-r-full flex justify-center items-center bg-blacks-lighter py-1 pl-2 pr-1.5">
                <LogoBR h="36" w="36" />
              </div>
            </Link>
            <div className="flex flex-grow items-center space-x-2 text-whites-dark self-center">
              <Hr className="w-14 text-whites-dark opacity-20" />
              <div className="text-xs">OR</div>
              <Hr className="w-14 text-whites-dark opacity-20" />
            </div>
            <Link
              to="/explore"
              className="text-xs self-center border-b border-whites-dark font-light"
            >
              Explore events
            </Link>
          </div>
        </div>

        <div className="relative w-full h-full text-center">
          <div className="w-full  bg-dark-backgroundDarker h-0.5 shadow-2xl opacity-50"></div>
          <div className="w-full flex flex-col items-center bg-dark-backgroundDark py-10 px-3">
            <div className="features-header max-w-min mb-20">
              <div className="sub-title uppercase text-sm text-primary-light leading-none text-left font-medium -mb-0.5 ml-0.5">
                singularity's
              </div>
              <div className="title uppercase text-5xl font-extrabold text-whites-light leading-none tracking-widest 2xl:text-11xl">
                features
              </div>
            </div>
            <div className="line-parent h-full relative">
              <div className="line text-primary-light absolute z-0 left-1/2 transform -translate-x-1/4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="1250"
                  viewBox="0 0 24 983"
                >
                  <g
                    id="Group_2071"
                    data-name="Group 2071"
                    transform="translate(-193 -111)"
                  >
                    <rect
                      id="Rectangle_1148"
                      data-name="Rectangle 1148"
                      width="3"
                      height="978"
                      transform="translate(204 116)"
                      fill="#df003c"
                    />
                    <circle
                      id="Ellipse_57"
                      data-name="Ellipse 57"
                      cx="12"
                      cy="12"
                      r="12"
                      transform="translate(193 111)"
                      fill="#df003c"
                    />
                    <g id="blades" transform="translate(198.064 114.51)">
                      <path
                        id="Path_23"
                        data-name="Path 23"
                        d="M1055.95,279.01a7.291,7.291,0,0,1-1.089,1.375,7.829,7.829,0,0,1-9.331,1.324l5.388-5.386a2.585,2.585,0,0,0-.031-4.9l2.971-2.971a7.429,7.429,0,0,1,1,.844A7.826,7.826,0,0,1,1055.95,279.01Z"
                        transform="translate(-1043.108 -265.696)"
                        fill="#151920"
                      />
                      <path
                        id="Path_22"
                        data-name="Path 22"
                        d="M1037.236,259.928a2.584,2.584,0,0,0,1.924,2.5l-3.017,3.017a7.677,7.677,0,0,1-1-.845,7.823,7.823,0,0,1-1.089-9.715,7.28,7.28,0,0,1,1.089-1.376,7.83,7.83,0,0,1,9.331-1.326l-5.225,5.225A2.587,2.587,0,0,0,1037.236,259.928Z"
                        transform="translate(-1032.844 -251.206)"
                        fill="#151920"
                      />
                    </g>
                    <circle
                      id="Ellipse_58"
                      data-name="Ellipse 58"
                      cx="1.3"
                      cy="1.3"
                      r="1.3"
                      transform="translate(203.699 121.7)"
                      fill="#151920"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="spacer"></div>

            <div className="handy px-2.5 text-sm mb-8 mt-12 self-start py-2.5 z-10 rounded-md  bg-dark-background  text-whites-light flex items-center">
              <span className="pl-1 pr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="pb-0.5 px-1.5 items-start space-y-0.5 flex flex-col">
                <span className="font-black text-xl">Handy</span>
                <p className="text-xs text-left leading-snug items-start tracking-wide opacity-80">
                  Singularity comes in with a handful of internal tools that
                  makes event organizing and management a piece of cake. All in
                  one place.
                  <br />
                  <br />
                  Say good-bye to Google Sheets, No more!
                </p>
              </span>
            </div>

            <div className="convenient relative w-80 px-2.5 text-sm my-20 self-end py-2.5 z-10 rounded-md bg-dark-background text-whites-light justify-end flex items-center">
              <span className="pb-0.5 px-1.5 items-start space-y-0.5 flex flex-col">
                <span className="font-black text-xl">Convenient</span>
                <p className="text-xs text-left leading-snug items-start tracking-wide opacity-80">
                  Utilize the templating system & the Templates repository that
                  Singularity offers; to help you setup events so quickly. You
                  don't see it coming!
                </p>
              </span>
              <span className="pr-1 pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            <div className="on-demand px-2.5 text-sm mb-8 mt-12 self-start py-2.5 z-10 rounded-md  bg-dark-background  text-whites-light flex items-center">
              <span className="pl-1 pr-4">
                <Nightbot />
              </span>
              <span className="pb-0.5 px-1.5 items-start space-y-0.5 flex flex-col">
                <span className="font-black text-xl">On demand</span>
                <p className="text-xs text-left leading-snug items-start tracking-wide opacity-80">
                  Singularity integrates with Nightbot for Twitch chat, where
                  your viewers can automatically get the event's LATEST scores.
                  <br />
                  <br />
                  No more editing your command manually after each round!
                </p>
              </span>
            </div>
            {/* prettier-ignore */}
            <div className="reaching relative px-2.5 text-sm my-20 self-end py-2.5 z-10 rounded-md  bg-dark-background  text-whites-light justify-end flex items-center"
              style={{
                width: "350px",
              }}
              >
              <span className="pb-0.5 px-1.5 items-start space-y-0.5 flex flex-col">
                <span className="font-black text-xl">Reaching</span>
                <p className="text-xs text-left leading-snug items-start tracking-wide opacity-80">
                  Singularity integrates with Discord. Our awesome and
                  very-human Galactico will notify channels on event
                  progression.
                  <br />
                  <br />
                  Great for updating your participants quickly.
                </p>
              </span>
              <span className="pr-1 pl-4">
                <Discord className="w-4 h-4" />
              </span>
             
            </div>

            <div className="free w-95 px-2.5 relative text-sm my-20 self-center py-10 z-10 rounded-md bg-dark-background  text-whites-light flex flex-col items-center">
              <span className="absolute bottom-full transform translate-y-1/2 translate-x-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <g
                    id="Group_2071"
                    data-name="Group 2071"
                    transform="translate(-193 -111)"
                  >
                    <circle
                      id="Ellipse_57"
                      data-name="Ellipse 57"
                      cx="12"
                      cy="12"
                      r="12"
                      transform="translate(193 111)"
                      fill="#df003c"
                    />
                    <g id="blades" transform="translate(198.064 114.51)">
                      <path
                        id="Path_23"
                        data-name="Path 23"
                        d="M1055.95,279.01a7.291,7.291,0,0,1-1.089,1.375,7.829,7.829,0,0,1-9.331,1.324l5.388-5.386a2.585,2.585,0,0,0-.031-4.9l2.971-2.971a7.429,7.429,0,0,1,1,.844A7.826,7.826,0,0,1,1055.95,279.01Z"
                        transform="translate(-1043.108 -265.696)"
                        fill="#151920"
                      />
                      <path
                        id="Path_22"
                        data-name="Path 22"
                        d="M1037.236,259.928a2.584,2.584,0,0,0,1.924,2.5l-3.017,3.017a7.677,7.677,0,0,1-1-.845,7.823,7.823,0,0,1-1.089-9.715,7.28,7.28,0,0,1,1.089-1.376,7.83,7.83,0,0,1,9.331-1.326l-5.225,5.225A2.587,2.587,0,0,0,1037.236,259.928Z"
                        transform="translate(-1032.844 -251.206)"
                        fill="#151920"
                      />
                    </g>
                    <circle
                      id="Ellipse_58"
                      data-name="Ellipse 58"
                      cx="1.3"
                      cy="1.3"
                      r="1.3"
                      transform="translate(203.699 121.7)"
                      fill="#151920"
                    />
                  </g>
                </svg>
              </span>
              <span className="pb-0.5 px-4 text-xs tracking-tight">
                on top of all that, it's completely
              </span>
              <span className="text-primary-light pb-0.5 pt-3.5 px-4 text-7xl font-extrabold leading-10 tracking-widest">
                FREE
              </span>
            </div>
          </div>
          <div
            style={{ height: "75vh" }}
            className="w-full flex flex-col space-y-10 bg-gradient-to-b from-dark-backgroundDark to-dark-background"
          >
            <div className="w-full filter brightness-90 flex flex-col space-y-2 justify-center items-center py-24 text-whites-light px-4">
              <span className="text-sm font-semibold">
                What are you waiting for!
              </span>
              <ButtonLink
                text="JOIN US AT SINGULARITY"
                variant="light"
                href="/join"
                className="max-w-min text-whites-light whitespace-nowrap px-2.5 py-1"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
            </div>
            <Hr className="w-3/4 text-whites-dark opacity-5 self-center" />
            <div className="px-6 w-full text-whites-light flex flex-col pb-12 pt-24 space-y-2">
              <span className="text-sm font-semibold">
                Want to get in touch?
              </span>
              <a
                href="mailto:contact@singularity.events"
                className="max-w-min whitespace-nowrap self-center bg-grays-light rounded-lg shadow-sm px-5 py-1 text-whites-light flex space-x-4 justify-center items-center"
              >
                <span>Contact us</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </MobileBaseLayout>
  );
};

export default Home;
