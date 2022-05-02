import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Tween } from 'react-gsap';

const LoadingWithDots = ({
  size = '2rem',
  color = 'primary',
  label = 'Loading',
  flow = 'col',
}) => {
  switch (flow) {
    case 'col':
      return (
        <div className='flex flex-col justify-center items-center space-y-2 uppercase'>
          <CircularProgress size={size} color={color} />
          <span className='opacity-80'>
            {label}
            <Tween
              duration={0.8}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              repeat={-1}
              stagger={0.5}
              ease='elastic.out(1,0.75)'
            >
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </Tween>
          </span>
        </div>
      );
    case 'row':
      return (
        <div className='flex justify-center items-center space-x-2 uppercase'>
          <span className='px-0.5 flex justify-center items-center -mr-0.5'>
            <CircularProgress size={size} color={color} />
          </span>
          <span className='opacity-80'>
            {label}
            <Tween
              duration={0.8}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              repeat={-1}
              stagger={0.5}
              ease='elastic.out(1,0.75)'
            >
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </Tween>
          </span>
        </div>
      );
    default:
      return (
        <div className='flex flex-col justify-center items-center space-y-2'>
          <CircularProgress size={size} color={color} />
          <span className='opacity-80'>
            {label}
            <Tween
              duration={0.8}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              repeat={-1}
              stagger={0.5}
              ease='elastic.out(1,0.75)'
            >
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </Tween>
          </span>
        </div>
      );
      break;
  }
};

export default LoadingWithDots;
