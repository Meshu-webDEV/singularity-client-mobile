import React, { useEffect, useState } from 'react';
import { Tween } from 'react-gsap';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import Header from '../../Components/layouts/Header';
import Hr from '../../Components/layouts/Hr';
import MobileBaseLayout from '../../Components/layouts/MobileBaseLayout';
import Button from '../../Components/actions/Button';
import EmailBackground from '../../Images/EmailBackground';
import EmailEnvelope from '../../Images/EmailEnvelope';

const ActivateEmail = () => {
  const location = useLocation();
  const history = useHistory();

  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log(location);
    const params = new URLSearchParams(location.search);
    for (let param of params) {
      if (param[0] === 'username') setUsername(param[1]);
    }
  }, []);

  return (
    <MobileBaseLayout header={<Header />} backLabel='Join' backPath='/Join'>
      <div className='flex flex-col space-y-10 px-2 pb-16 flex-grow justify-center items-center text-whites-light'>
        <div className='self-center font-semibold tracking-wide'>
          Verify your email.
        </div>
        <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={0.75}>
          <div className='self-center relative h-44 w-11/12 mr-9'>
            <EmailBackground className='w-48 absolute z-10 transform left-1/2 -translate-x-1/2' />
            <EmailEnvelope className='w-24 bottom-4 absolute z-20 transform left-2/3 -translate-x-1/2' />
          </div>
        </Tween>
        <div className='flex flex-col space-y-3'>
          <div className='self-start text-base rounded-md shadow-lg w-full'>
            <div className='flex space-x-2 pr-2 items-center w-full flex-grow capitalize text-xs text-whites-dark'>
              <span className='flex space-x-1 items-center justify-center'>
                <span
                  style={{ maxWidth: '120px' }}
                  className='whitespace-nowrap overflow-x-scroll'
                >
                  {username}
                </span>
                <span>🌹</span>
              </span>

              <Hr className='text-whites-dark opacity-10 w-16' />
            </div>
          </div>
          <div className='text-xs self-start leading-relaxed'>
            We have sent you an email.
            <br /> Please check your inbox{' '}
            <span className='text-xxs text-whites-dark font-sans'>
              (or spam folder)
            </span>{' '}
            and follow the link to verify your email & activate your account.
          </div>
        </div>

        <Hr className='text-whites-dark opacity-20 w-9/12' />

        <div className='self-start flex flex-col space-y-2'>
          <div className='text-xxs text-whites-dark'>
            After you activate your email.
          </div>
          <div>
            <Button
              onClick={() => history.replace('/join')}
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              className='text-xs text-blacks-dark'
              text='Sign in'
            />
          </div>
        </div>
      </div>
      <div className='text-xxs self-center text-whites-dark'>
        Having problems? contact us at{' '}
        <a
          className='underline text-info font-semibold'
          href='mailto:contact@singularity.events'
        >
          contact@singularity.events
        </a>
      </div>
    </MobileBaseLayout>
  );
};

export default ActivateEmail;
