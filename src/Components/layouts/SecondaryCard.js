import React from 'react';
import Button from '../actions/Button';
import TinySquare from './TinySquare';

const SecondaryCard = ({
  title,
  subtitle,
  children,
  nopadding = false,
  primaryAction,
  secondaryAction,
  className,
}) => {
  return (
    <div
      className={`relative w-full h-auto bg-blacks-lighter rounded-sm shadow-sm flex flex-col space-y-3 ${
        nopadding ? 'py-3.5' : 'p-3.5'
      }  ${className}`}
    >
      {title && (
        <div className='flex space-x-1.5 pb-2 items-center pl-2.5'>
          <span className='font-medium text-xs opacity-80 tracking-normal text-whites-light'>
            {title}
          </span>
          <TinySquare size='medium' className='bg-dark-backgroundDarker' />
          <span className='text-xxs font-light tracking-tighter text-whites-light opacity-50'>
            {subtitle}
          </span>
        </div>
      )}
      <div>{children}</div>
      <div className='flex space-x-4 justify-center items-center self-end text-xs pt-4'>
        <span className='opacity-90 text-xs pt-0.5'>
          {secondaryAction && secondaryAction}
        </span>
        {primaryAction && primaryAction}
      </div>
    </div>
  );
};

export default SecondaryCard;
