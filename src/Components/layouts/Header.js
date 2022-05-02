import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

// Context
import AuthContext from '../../Context/Auth/AuthContext';
import SidemenuContext from '../../Context/Sidemenu/SidemenuContext';

// Components
import Button from '../actions/Button';

// Images
import Menu from '../../Images/Menu';
import Input from '../forms/Input';
import { useMemo } from 'react';
import { normalize } from '../../lib/utils';
import { indexOf } from 'lodash';

const Header = ({ isTransitional, searchVariant = 'light' }) => {
  //

  const history = useHistory();
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const { setSidemenu } = useContext(SidemenuContext);
  const { authState } = useContext(AuthContext);

  const currentView = useMemo(
    () => normalize(pathname.slice(pathname.lastIndexOf('/') + 1)),
    []
  );
  const rootView = useMemo(
    () =>
      normalize(
        pathname.slice(
          pathname.indexOf('/') + 1,
          pathname.indexOf('/', pathname.indexOf('/') + 1)
        )
      ),
    []
  );

  // Handlers
  const handleOnChangeSearch = value => {
    if (searchError) setSearchError('');
    setSearchQuery(value);
  };
  const handleSubmitSearch = () => {
    if (!searchQuery) return setSearchError('Cannot be empty!');

    history.push(`/explore?q=${searchQuery}`);
  };

  // helpers
  const isLightVariant = () => searchVariant === 'light';

  const showSearchBar = () => {
    if (currentView === 'my-events') return false;
    if (currentView === 'explore') return false;
    if (rootView === 'dashboard') return true;
    if (currentView === '') return false;
    return true;
  };

  if (isTransitional)
    return (
      <div className='transitional w-full h-20 flex items-center flex-row space-x-2 justify-between pl-8 pr-10 opacity-20'>
        <Menu className='w-5 h-5 pt-2 opacity-90' handleOnClick={undefined} />
        <div className='flex space-x-0 justify-end items-end'>
          <div className='flex justify-end text-end items-center space-x-1 opacity-90 font-light  text-whites-light self-end'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='13'
              width='13'
              viewBox='0 0 10 11.667'
            >
              <g transform='translate(-17390 -18095)'>
                <path
                  d='M9,9A2.5,2.5,0,1,0,6.5,6.5,2.5,2.5,0,0,0,9,9ZM4,15.667c0-3.222.639-5.833,5-5.833s5,2.612,5,5.833Z'
                  transform='translate(17386 18091)'
                  fill='currentColor'
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    );

  if (authState)
    return (
      <div className='registered w-full 2xs:max-w-md self-center h-20 flex items-center flex-row space-x-2 justify-between pl-8 pr-10'>
        <Menu
          className='w-5 h-5 pt-2 opacity-90 flex-shrink-0'
          handleOnClick={setSidemenu}
        />
        {/* Search bar */}

        {showSearchBar() && (
          <div className='relative'>
            <div className='flex flex-col space-y-1'>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmitSearch();
                }}
              >
                <Input
                  type='text'
                  placeholder='Search events..'
                  noLabel
                  size='large'
                  rounded='rounded-sm'
                  value={searchQuery}
                  onChange={e => handleOnChangeSearch(e.target.value)}
                  bg={
                    isLightVariant()
                      ? 'bg-blacks-lighter'
                      : 'bg-blacks-light bg-opacity-70'
                  }
                />
                {searchError ? (
                  <div className='absolute top-full text-3xs pl-1 text-primary-dark'>
                    {searchError}
                  </div>
                ) : null}
              </form>
            </div>

            <button
              type='submit'
              onClick={handleSubmitSearch}
              className={`absolute transform right-1 top-1/2 -translate-y-1/2 rounded-sm ${
                isLightVariant()
                  ? 'bg-dark-background'
                  : 'bg-dark-backgroundDarker'
              } max-w-max h-6/7 p-1.5 flex justify-center items-center`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 opacity-80 '
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        )}

        <div className='flex space-x-3 justify-center items-center'>
          <Link
            to='/dashboard'
            className='flex justify-center text-sm items-center opacity-90 font-light  text-whites-light self-end'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
            </svg>
          </Link>
          <Link
            to='/dashboard/my-profile'
            className='flex justify-center flex-grow text-sm items-center opacity-90 font-light  text-whites-light'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='subpixel-antialiased'
              height='13'
              width='14'
              viewBox='0 0 10 11.667'
            >
              <g transform='translate(-17390 -18095)'>
                <path
                  d='M9,9A2.5,2.5,0,1,0,6.5,6.5,2.5,2.5,0,0,0,9,9ZM4,15.667c0-3.222.639-5.833,5-5.833s5,2.612,5,5.833Z'
                  transform='translate(17386 18091)'
                  fill='currentColor'
                />
              </g>
            </svg>
          </Link>
        </div>
      </div>
    );

  return (
    <div className='unregistered w-full h-20 flex items-center flex-row justify-between px-8 sm:px-0'>
      <Menu className='w-5 h-5 pt-2 opacity-90' handleOnClick={setSidemenu} />
      <Link
        to='/dashboard'
        className='flex justify-end text-xs rounded-md bg-primary-dark shadow-md uppercase py-1 px-2 text-whites-light'
      >
        Join us!
      </Link>
    </div>
  );
};

export default Header;
