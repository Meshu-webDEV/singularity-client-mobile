import React, { useContext } from 'react';

// Components
import MobileBaseLayout from '../../Components/layouts/MobileBaseLayout';
import Header from '../../Components/layouts/Header';

// Context
import EventContext from '../../Context/Event/EventContext';
import { toWords } from 'number-to-words/numberToWords';
import RoundsTable from '../../Components/layouts/RoundsTable';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useFormikContext } from 'formik';
import Button from '../../Components/actions/Button';
import { useState } from 'react';
import { Slide } from '@material-ui/core';

// Other
import { useInView } from 'react-intersection-observer';
import LoadingWithDots from '../../Components/layouts/LoadingWithDots';
import ToastContext from '../../Context/Toast/ToastContext';
import ModalContext from '../../Context/Modal/ModalContext';
import { useMemo } from 'react';
import StandingsTable from '../../Components/layouts/StandingsTable';

const EventRoundUpdate = () => {
  //

  const [hiddenBtn, setHiddenBtn] = useState(false);
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: '-80px 0px',
  });

  // Formik Context
  const { setValues, values, setSubmitting, isSubmitting } = useFormikContext();

  const { round, id } = useParams();
  const history = useHistory();

  const { event, progressEventRounds, progressEventEndRound, setShouldUpdate } =
    useContext(EventContext);
  const { setToast } = useContext(ToastContext);
  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  // Handlers
  const handleUpdateRound = async () => {
    try {
      setSubmitting(true);
      await progressEventRounds(event.uniqueid, round, values.roundPoints);
      setShouldUpdate(true);
      setToast({
        variant: 'success',
        message: `Successfully updated round <span class="font-semibold uppercase">${toWords(
          parseInt(round) + 1
        )}</span> scores!`,
      });
      history.replace(`/${event.uniqueid}`);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndRound = async () => {
    try {
      setSubmitting(true);
      await progressEventEndRound(event.uniqueid, round, values.roundPoints);
      setShouldUpdate(true);
      setToast({
        variant: 'success',
        message: `Successfully ended round <span class="font-semibold uppercase">${toWords(
          round + 1
        )}</span>`,
      });
      history.replace(`/${event.uniqueid}`);
    } catch (error) {}
  };

  const handleConfirmStandings = () => {
    offModal();

    const timeoutId = setTimeout(() => {
      setModalComponent(
        <ConfirmStandingsModal
          offModal={offModal}
          setModal={setModal}
          setModalProps={setModalProps}
          event={event}
          standings={[...event.standingsTable]}
          roundPoints={values.roundPoints}
          round={parseInt(round)}
        />
      );
      setModalProps({
        title: `Confirm updated standings before ending round ${toWords(
          parseInt(round) + 1
        ).toUpperCase()}`,
        variant: 'success',
        action: (
          <Button
            className='whitespace-nowrap text-blacks-dark'
            onClick={handleEndRound}
            text='End round'
            variant='success'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            }
          />
        ),
        secondary: (
          <Button
            className='whitespace-nowrap text-whites-dark text-xxs'
            onClick={offModal}
            textOnly
            text='Discard'
            variant='light'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3 w-3'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            }
          />
        ),
      });
      setModal();
    }, 200);
  };

  const handleConfirmRoundScores = () => {
    setModalComponent(
      <ConfirmEndRoundModal
        offModal={offModal}
        setModal={setModal}
        setModalProps={setModalProps}
        event={event}
        standings={[...event.standingsTable]}
        roundPoints={values.roundPoints}
        round={parseInt(round)}
      />
    );

    setModal('full');
    setModalProps({
      title: `Confirm round ${toWords(
        parseInt(round) + 1
      )} scores before ending.`,
      variant: 'info',
      action: (
        <div className='flex flex-col space-y-1 justify-start'>
          <span className='text-xs font-light text-whites-dark'>Next ..</span>
          <Button
            className='whitespace-nowrap text-whites-light'
            onClick={handleConfirmStandings}
            text='Confirm new standings'
            variant='info'
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
          />
        </div>
      ),
      secondary: (
        <Button
          className='whitespace-nowrap text-whites-dark text-xxs'
          onClick={offModal}
          textOnly
          text='Discard'
          variant='light'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
          }
        />
      ),
    });
  };

  useEffect(() => {
    setValues(
      event.roundsTables
        ? { roundPoints: event.roundsTables[round] }
        : undefined
    );
  }, []);

  useEffect(() => {
    return () => setSubmitting(false);
  }, []);

  if (isEmpty(event)) return <Redirect to={`/${id}`} />;

  return (
    <MobileBaseLayout
      header={<Header />}
      backPath={`/${id}`}
      backLabel='Event page'
      title={
        <span className='uppercase'>
          {event.name} <span className='font-sans px-0.5'>/</span> Round{' '}
          {toWords(parseInt(round) + 1)}
        </span>
      }
    >
      <div className='relative flex-grow h-full pb-10'>
        {/* Controls  */}
        <Slide in={!hiddenBtn || (inView && hiddenBtn)} direction='left'>
          <div
            className={` bottom-16 ${
              !hiddenBtn && inView ? '-right-3' : 'right-1'
            } transition-all ease-in duration-1000 text-whites-light fixed flex justify-center items-center text-xs`}
          >
            {/* Discard */}
            <Button
              className='text-xxs text-whites-dark mx-2'
              text='Discard'
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3 w-3'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              textOnly
              variant='light'
            />
            {/* Update scores */}
            <Button
              className='whitespace-nowrap py-1.5 text-whites-dark'
              text={
                isSubmitting ? (
                  <LoadingWithDots
                    flow='row'
                    label='Updating'
                    color='inherit'
                    size='0.5rem'
                  />
                ) : (
                  'Update scores'
                )
              }
              onClick={handleUpdateRound}
              variant='dark'
            />
            {/* End round */}
            <div>
              <Button
                className='mx-2 text-blacks-dark font-medium whitespace-nowrap'
                text={
                  isSubmitting ? (
                    <LoadingWithDots
                      flow='row'
                      label='Updating'
                      color='inherit'
                      size='0.5rem'
                    />
                  ) : (
                    'End round'
                  )
                }
                onClick={handleConfirmRoundScores}
                icon={
                  !isSubmitting ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3.5 w-3.5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                      <path
                        fillRule='evenodd'
                        d='M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : null
                }
                variant='success'
              />
            </div>
            <Slide in={!inView} direction='left'>
              <div className='py-0.5 flex text-center justify-center items-center rounded-sm shadow-card bg-blacks-dark text-whites-light'>
                <Button
                  onClick={() => setHiddenBtn(true)}
                  className='flex justify-center items-center'
                  iconOnly
                  icon={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
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
                  variant='none'
                />
              </div>
            </Slide>
          </div>
        </Slide>
        {/* Show/hide controls button*/}
        <Slide in={hiddenBtn && !inView} direction='left'>
          <div className='bottom-16 right-1 text-whites-light fixed flex justify-center items-center space-x-4 text-xs '>
            <div className='py-0.5 flex text-center justify-center items-center rounded-sm shadow-card bg-blacks-dark text-whites-light'>
              <Button
                onClick={() => setHiddenBtn(false)}
                className='flex justify-center items-center'
                iconOnly
                icon={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                }
                variant='none'
              />
            </div>
          </div>
        </Slide>

        <RoundsTable data={event.roundsTables[round].table} type='input' />
        <div ref={ref}></div>
      </div>
    </MobileBaseLayout>
  );
};

export default EventRoundUpdate;

const ConfirmEndRoundModal = ({ roundPoints }) => {
  //

  return (
    <div className='h-full text-whites-light flex flex-col space-y-2 py-2.5'>
      <div className='text-xs'>Updated current round scores:</div>
      <div>
        <RoundsTable data={roundPoints.table} key='confirmationRounds' />
      </div>
    </div>
  );
};

const ConfirmStandingsModal = ({ event, roundPoints, round, standings }) => {
  //

  // Constants:
  const eventStandings = useMemo(
    () =>
      standings.map(s => {
        return { ...s };
      }),
    []
  );

  const pointPerKill = useMemo(() => event.pointPerKill, []);
  const pointsDistribution = useMemo(() => event.pointsDistribution, []);

  // ****
  // TODO: roundStandings are not updated as per the input before hitting "end round"
  //       only works when updating rounds to db first then ending
  // ****

  // Calculate scores for round X
  const roundStandings = useMemo(() => {
    return roundPoints.table.map(team => {
      // calculate kills
      const kills = team.kills * pointPerKill;
      // set points for placement based on set distribution
      const placement =
        pointsDistribution[team.placement < 1 ? 19 : team.placement - 1];
      // Set total points
      const points = kills + placement;
      return { name: team.name, uniqueid: team.uniqueid, points: points };
    });
  }, []);
  const newStandings = useMemo(() => {
    return roundStandings.map(standing => {
      const team = eventStandings.find(
        eventStanding => standing.uniqueid === eventStanding.uniqueid
      );
      team.points = team.points + standing.points;
      return team;
    });
  }, []);

  return (
    <div className='h-full text-whites-light flex flex-col space-y-2 py-2.5'>
      <div className='text-xs'>
        <span className='font-medium underline'>Standings</span> will update to:
      </div>
      <div>
        <StandingsTable data={newStandings} key='confirmationStandings' />
      </div>
    </div>
  );
};
