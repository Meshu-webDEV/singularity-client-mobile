import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import MobileLogo from '../../Components/layouts/MobileLogo';
import MobileBaseLayout from '../../Components/layouts/MobileBaseLayout';
import Header from '../../Components/layouts/Header';

// GSAP
import { Tween, Timeline, Reveal } from 'react-gsap';

// Context
import ModalContext from '../../Context/Modal/ModalContext';

// Context
import LogoBR from '../../Images/LogoBR';
import Hr from '../../Components/layouts/Hr';

const Home = () => {
  const { setModalComponent, setModal } = useContext(ModalContext);

  const handleLearnNightbot = () => {
    setModalComponent(<div className='text-whites-light'>Hey</div>);
    setModal();
  };

  return (
    <MobileBaseLayout header={<Header />} navigation={false} nopadding isHome>
      <div className='h-full w-full space-y-20 flex  flex-col'>
        <div
          className='flex z-10 flex-col space-y-4  justify-center w-full min-h-screen px-9 2xs:px-14'
          style={{
            height: '60vh',
          }}
        >
          <Timeline
            target={
              <div>
                <MobileLogo />
              </div>
            }
          >
            <Tween
              from={{ x: '500px' }}
              duration={1}
              ease='elastic.out(1,0.75)'
            />
          </Timeline>
          <div className='call-to-action self-end max-w-min flex space-y-3 flex-col justify-end text-whites-light'>
            <div className='flex self-end shadow-md'>
              <span className='rounded-l-lg text-sm tracking-tight flex justify-center items-center  bg-dark-backgroundDarker py-1 px-4 uppercase whitespace-nowrap'>
                Create a new event
              </span>

              <div className='rounded-r-full flex justify-center items-center bg-blacks-lighter py-1 pl-2 pr-1.5'>
                <LogoBR h='36' w='36' />
              </div>
            </div>
            <div className='flex flex-grow items-center space-x-2 text-whites-dark self-center'>
              <Hr className='w-14 text-whites-dark opacity-20' />
              <div className='text-xs'>OR</div>
              <Hr className='w-14 text-whites-dark opacity-20' />
            </div>
            <Link
              to='/explore'
              className='text-xs self-center border-b border-whites-dark font-light'
            >
              Explore ongoing events
            </Link>
          </div>
        </div>

        <div className='relative w-full h-full text-center'>
          <div className='w-full  bg-dark-backgroundDarker h-0.5 shadow-2xl opacity-50'></div>
          <div className='w-full flex flex-col items-center  bg-dark-backgroundDark py-10 px-6'>
            <div className='text-lg font-light mb-10  text-whites-light'>
              Why use <span className='font-medium '>singularity</span>?
            </div>
            <div className='line-parent h-full relative'>
              <div className='line absolute z-0 left-1/2 transform -translate-x-1/4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='978'
                  viewBox='0 0 24 978'
                >
                  <line
                    id='Line_37'
                    y2='970'
                    transform='translate(11.5 6.5)'
                    fill='none'
                    stroke='#07b85c'
                    strokeLinecap='round'
                    strokeWidth='3'
                  />
                  <g id='Group_1580' transform='translate(-6214.937 7209.063)'>
                    <circle
                      id='Ellipse_55'
                      cx='12'
                      cy='12'
                      r='12'
                      transform='translate(6214.937 -7209.063)'
                      fill='#07b85c'
                    />
                    <g id='Group_1475' transform='translate(6220.4 -7205.326)'>
                      <path
                        id='Path_20'
                        d='M875.986,259.433a2.437,2.437,0,0,0,1.815,2.355l-2.845,2.846a7.245,7.245,0,0,1-.944-.8,7.379,7.379,0,0,1-1.027-9.163,6.867,6.867,0,0,1,1.027-1.3,7.385,7.385,0,0,1,8.8-1.251l-4.928,4.928A2.44,2.44,0,0,0,875.986,259.433Z'
                        transform='translate(-871.844 -251.206)'
                        fill='#0b0d13'
                      />
                      <g id='Group_1474' transform='translate(2.286 3.107)'>
                        <path
                          id='Path_21'
                          d='M894.358,278.41a6.884,6.884,0,0,1-1.027,1.3,7.385,7.385,0,0,1-8.8,1.249l5.082-5.08a2.439,2.439,0,0,0-.029-4.624l2.8-2.8a7,7,0,0,1,.946.8A7.381,7.381,0,0,1,894.358,278.41Z'
                          transform='translate(-884.53 -268.45)'
                          fill='#0b0d13'
                        />
                      </g>
                    </g>
                    <circle
                      id='Ellipse_56'
                      cx='1.226'
                      cy='1.226'
                      r='1.226'
                      transform='translate(6225.71 -7198.29)'
                      fill='#0b0d13'
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className='spacer'></div>

            <div className='free px-2.5 text-sm mb-8 mt-12 self-start py-2.5 z-10 rounded-md  bg-dark-backgroundDarker  text-whites-light flex items-center'>
              <span className='px-2.5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <span className='pb-0.5 px-1.5 items-start space-y-0.5 flex flex-col'>
                <span>Absolutely free!</span>
                <span className='text-xxs font-light items-start -space-y-1.5 tracking-wide opacity-80 flex-col flex'>
                  <span>As an organizer or an enthusiast</span>
                  <span>singularity and all its features is free</span>
                </span>
              </span>
            </div>
            <Reveal threshold='0.90'>
              <Tween from={{ opacity: 0 }} duration={0.3}>
                <div className='nightbot relative w-72 px-2.5 text-sm my-8 self-end py-2.5 z-10 rounded-md  bg-dark-backgroundDarker  text-whites-light justify-end flex items-center'>
                  <span className='pb-0.5 w-5/6 px-1.5 items-end space-y-0.5 flex flex-col'>
                    <span>Twitch chat integration</span>
                    <span className='text-xxs font-light items-end -space-y-1.5 tracking-wide opacity-80 flex-col flex'>
                      <span className='leading-3 text-right whitespace-pre-wrap'>
                        Without leaving your stream, viewers can get event
                        updates on-demand within your chat, using nightbot
                      </span>
                    </span>
                  </span>
                  <span className='px-2.5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='13.755'
                      height='15.675'
                      viewBox='0 0 13.755 15.675'
                    >
                      <g id='g3363' transform='translate(-458.691 935.796)'>
                        <g id='g3365' transform='translate(458.691 -935.796)'>
                          <path
                            id='path3367'
                            d='M-88.917-59.272l-2.24,2.24h-3.518l-1.919,1.919v-1.919h-2.879V-66.31h10.557Zm-11.837-8.317-.64,2.559v11.516h2.879v1.6h1.6l1.6-1.6h2.559l5.118-5.118v-8.958Z'
                            transform='translate(101.393 67.589)'
                            fill='#fff'
                            fillRule='evenodd'
                          />
                        </g>
                        <path
                          id='path3369'
                          d='M502.888-900.764h1.28V-904.6h-1.28Zm3.519,0h1.28V-904.6h-1.28Z'
                          transform='translate(-38.759 -27.355)'
                          fill='#fff'
                          fillRule='evenodd'
                        />
                      </g>
                    </svg>
                  </span>
                  <span
                    onClick={handleLearnNightbot}
                    className='absolute top-full left-3/4 pl-2 opacity-70 underline text-xxs tracking-tighter'
                  >
                    learn more
                  </span>
                </div>
              </Tween>
            </Reveal>
            <Reveal threshold='0.85'>
              <Tween from={{ opacity: 0 }} duration={0.3}>
                <div className='discord relative w-72 px-2.5 text-sm my-8 self-start py-2.5 z-10 rounded-md  bg-dark-backgroundDarker  text-whites-light flex items-center'>
                  <span className='px-2.5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16.02'
                      height='12.4'
                      viewBox='0 0 16.02 12.4'
                    >
                      <path
                        id='Path_40'
                        d='M13.57,12.8a13.047,13.047,0,0,0-3.3-1.039,9.691,9.691,0,0,0-.423.879,12.135,12.135,0,0,0-3.663,0,9.4,9.4,0,0,0-.428-.879,13,13,0,0,0-3.307,1.041A13.861,13.861,0,0,0,.068,22.087a13.213,13.213,0,0,0,4.053,2.077,10.081,10.081,0,0,0,.868-1.43,8.536,8.536,0,0,1-1.367-.665c.115-.085.227-.174.335-.265a9.341,9.341,0,0,0,8.1,0c.11.091.222.18.335.265a8.515,8.515,0,0,1-1.37.667,10.036,10.036,0,0,0,.868,1.43,13.187,13.187,0,0,0,4.056-2.078A13.847,13.847,0,0,0,13.57,12.8ZM5.349,20.218a1.653,1.653,0,0,1,0-3.278,1.537,1.537,0,0,1,1.44,1.64A1.545,1.545,0,0,1,5.349,20.218Zm5.322,0a1.653,1.653,0,0,1,0-3.278,1.537,1.537,0,0,1,1.44,1.64A1.546,1.546,0,0,1,10.671,20.218Z'
                        transform='translate(0 -11.765)'
                        fill='#fff'
                      />
                    </svg>
                  </span>
                  <span className='pb-0.5 w-5/6 items-start  px-1.5 space-y-0.5 flex flex-col'>
                    <span>Discord integration</span>
                    <span className='text-xxs font-light -space-y-1.5 tracking-wide opacity-80 flex-col flex'>
                      <span className='leading-3 text-left whitespace-pre-wrap'>
                        Notify your chosen discord channels When event starts or
                        on event progression, using discord's built-in webhooks
                      </span>
                    </span>
                  </span>
                  <span className='absolute top-full right-3/4 pr-2 opacity-70 underline text-xxs tracking-tighter'>
                    learn more
                  </span>
                </div>
              </Tween>
            </Reveal>
            <Reveal threshold='0.85'>
              <Tween from={{ opacity: 0 }} duration={0.3}>
                <div className='needs px-2.5 text-sm my-8 self-end py-2.5 z-10 rounded-md  bg-dark-backgroundDarker  text-whites-light flex items-center'>
                  <span className='pb-0.5 px-1.5 items-end space-y-0.5 flex flex-col'>
                    <span>Meets your viewers needs!</span>
                    <span className='text-xxs text-right font-light -space-y-1.5 tracking-wide opacity-80 flex-col flex'>
                      <span>Made with the avid spectator in mind</span>
                      <span>as we are very much in love with apex comp</span>
                    </span>
                  </span>
                  <span className='px-2.5  text-whites-light'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                </div>
              </Tween>
            </Reveal>
            <Reveal threshold='0.85'>
              <Tween from={{ opacity: 0 }} duration={0.3}>
                <div className='easy px-2.5 text-sm my-8 self-end py-2.5 z-10 rounded-md  bg-dark-backgroundDarker  text-whites-light flex items-center'>
                  <span className='px-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='6'
                      height='6'
                      viewBox='0 0 6 6'
                    >
                      <circle id='Ellipse_72' cx='3' cy='3' r='3' fill='#fff' />
                    </svg>
                  </span>
                  <span className='pb-0.5 px-1.5'>
                    Easy and simple-to-use UI
                  </span>
                </div>
              </Tween>
            </Reveal>
            <Reveal threshold='0.85'>
              <Tween from={{ opacity: 0 }} duration={0.3}>
                <div className='quickly px-2.5 text-sm my-8 self-start py-2.5 z-10 rounded-md  bg-dark-backgroundDarker  text-whites-light flex items-center'>
                  <span className='px-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='6'
                      height='6'
                      viewBox='0 0 6 6'
                    >
                      <circle id='Ellipse_72' cx='3' cy='3' r='3' fill='#fff' />
                    </svg>
                  </span>

                  <span className='pb-0.5 px-1.5'>
                    Responsive and Mobile-friendly UI
                  </span>
                </div>
              </Tween>
            </Reveal>
            <Reveal threshold='0.85'>
              <Tween from={{ opacity: 0 }} duration={0.3}>
                <div className='quickly px-2.5 text-sm my-8 self-end py-2.5 z-10 rounded-md  bg-dark-backgroundDarker  text-whites-light flex items-center'>
                  <span className='px-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='6'
                      height='6'
                      viewBox='0 0 6 6'
                    >
                      <circle id='Ellipse_72' cx='3' cy='3' r='3' fill='#fff' />
                    </svg>
                  </span>
                  <span className='pb-0.5 px-1.5'>
                    Quickly get events up and running
                  </span>
                </div>
              </Tween>
            </Reveal>
            <Reveal>
              <Tween from={{ opacity: 0 }} duration={0.3}>
                <div className='more px-2.5 relative text-sm my-8 self-center py-2.5 z-10 rounded-md  bg-dark-backgroundDarker  text-whites-light flex items-center'>
                  <span className='absolute -mt-1.5 -top-1/2 left-1/2 transform translate-y-1/4 -translate-x-1/4 pr-1.5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='25'
                      height='25'
                      viewBox='0 0 16 16'
                    >
                      <g
                        id='Group_1582'
                        transform='translate(-6215.114 7208.886)'
                      >
                        <circle
                          id='Ellipse_55'
                          cx='8'
                          cy='8'
                          r='8'
                          transform='translate(6215.114 -7208.886)'
                          fill='#07b85c'
                        />
                        <g
                          id='Group_1475'
                          transform='translate(6218.66 -7206.517)'
                        >
                          <path
                            id='Path_20'
                            d='M874.667,256.812a1.66,1.66,0,0,0,1.236,1.6l-1.939,1.939a4.93,4.93,0,0,1-.643-.543,5.028,5.028,0,0,1-.7-6.243,4.677,4.677,0,0,1,.7-.884,5.032,5.032,0,0,1,6-.852l-3.358,3.358A1.663,1.663,0,0,0,874.667,256.812Z'
                            transform='translate(-871.844 -251.206)'
                            fill='#0b0d13'
                          />
                          <g id='Group_1474' transform='translate(1.558 2.117)'>
                            <path
                              id='Path_21'
                              d='M891.227,275.236a4.691,4.691,0,0,1-.7.884,5.032,5.032,0,0,1-6,.851l3.462-3.461a1.662,1.662,0,0,0-.02-3.151l1.909-1.909a4.775,4.775,0,0,1,.645.543A5.03,5.03,0,0,1,891.227,275.236Z'
                              transform='translate(-884.53 -268.45)'
                              fill='#0b0d13'
                            />
                          </g>
                        </g>
                        <circle
                          id='Ellipse_56'
                          cx='0.835'
                          cy='0.835'
                          r='0.835'
                          transform='translate(6222.277 -7201.722)'
                          fill='#0b0d13'
                        />
                      </g>
                    </svg>
                  </span>
                  <span className='pb-0.5 px-4'>And much more..</span>
                </div>
              </Tween>
            </Reveal>
          </div>
          <div className='w-full  bg-blacks-dark flex justify-around py-8  text-whites-light px-4'></div>
          <div className='px-6 w-full flex flex-col py-8 space-y-4'>
            <div className='text-xl  text-whites-light self-center'>
              Want to get in touch?
            </div>
            <form className='flex flex-col space-y-4 justify-center items-start'>
              <div className='flex flex-col space-y-1 items-start'>
                <label
                  htmlFor='email'
                  className='text-whites-dark text-sm opacity-90 pl-1'
                >
                  Email
                </label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className='w-full  text-whites-light text-xs  focus:ring-transparent  bg-dark-backgroundDark h-7 rounded-sm  focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-25  focus:border-secondary-dark placeholder-whites-dark placeholder-opacity-20 '
                />
              </div>
              <div className='flex flex-col space-y-1 items-start'>
                <label
                  htmlFor='subject'
                  className='text-whites-dark text-sm opacity-90 pl-1'
                >
                  Subject
                </label>
                <input
                  type='text'
                  name='subject'
                  id='subject'
                  className='w-full  text-whites-light text-xs  focus:ring-transparent  bg-dark-backgroundDark h-7 rounded-sm  focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-25  focus:border-secondary-dark placeholder-whites-dark placeholder-opacity-20 '
                />
              </div>
              <div className='w-full flex flex-col space-y-1 items-start'>
                <label
                  htmlFor='message'
                  className='text-whites-dark text-sm opacity-90 pl-1'
                >
                  Message
                </label>
                <textarea
                  type='text'
                  name='message'
                  id='message'
                  className='w-full h-32  text-whites-light text-xs  focus:ring-transparent  bg-dark-backgroundDark rounded-sm  focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-25  focus:border-secondary-dark placeholder-whites-dark placeholder-opacity-20 '
                />
              </div>

              <button
                type='submit'
                className='py-1 mr-1 px-3  text-whites-light shadow-md  bg-secondary-light text-sm rounded-md self-end'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </MobileBaseLayout>
  );
};

export default Home;
