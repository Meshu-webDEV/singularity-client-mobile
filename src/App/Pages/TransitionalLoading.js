import React from 'react';

// Components
import Header from '../../Components/layouts/Header';
import LoadingWithDots from '../../Components/layouts/LoadingWithDots';
import MobileBaseLayout from '../../Components/layouts/MobileBaseLayout';

const TransitionalLoading = ({ text }) => {
  return (
    <MobileBaseLayout header={<Header isTransitional />} navigation={false}>
      <div className='w-full relative h-5/7 flex flex-col flex-grow space-y-6 items-center justify-center px-4 py-4 text-xxs text-whites-light'>
        <LoadingWithDots label={text} size='2.5rem' />
      </div>
    </MobileBaseLayout>
  );
};

export default TransitionalLoading;
