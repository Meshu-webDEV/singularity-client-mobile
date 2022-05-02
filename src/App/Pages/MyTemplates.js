import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import { Link } from 'react-router-dom';

// Components
import Header from '../../Components/layouts/Header';
import MobileBaseLayout from '../../Components/layouts/MobileBaseLayout';
import SecondaryCard from '../../Components/layouts/SecondaryCard';
import Button from '../../Components/actions/Button';
import LoadingWithDots from '../../Components/layouts/LoadingWithDots';
import FastInput from '../../Components/forms/FastInput';
import Hr from '../../Components/layouts/Hr';
import MarkdownInput from '../../Components/forms/MarkdownInput';
import TinySquare from '../../Components/layouts/TinySquare';
import GridList from '../../Components/layouts/GridList';
import ConfirmationModal from '../../Components/actions/ConfirmationModal';
import { default as SwitchInput } from '../../Components/forms/Switch';

// MUI
import { default as MuiSwitch } from '@material-ui/core/Switch';

// Context
import ModalContext from '../../Context/Modal/ModalContext';
import TemplatesContext from '../../Context/Templates/TemplatesContext';
import FormikTemplatesContext from '../../Context/Formik/FormikTemplatesContext';
import { useFormikContext } from 'formik';

// Other
import { isEmpty } from 'lodash';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import currencies from '../../lib/currencies.json';

// Images
import Markdown from '../../Images/Markdown';
import TeamsFieldsArray from '../../Components/forms/TeamsFieldsArray';
import InputSlider from '../../Components/forms/InputSlider';
import PointsFields from '../../Components/forms/PointsFields';
import { PrizesForm } from './NewEvent';
import ToastContext from '../../Context/Toast/ToastContext';
import { TEMPLATES_LOAD_TYPES } from '../../lib/constants';

const _currencies = currencies.map(currency => {
  return {
    name: currency.name,
    code: currency.code,
    symbol: currency.symbol,
  };
});

const MyTemplates = () => {
  //

  const match = useRouteMatch();
  const {
    getTemplateByUniqueid,
    deleteTemplateById,
    initialLoadMyTemplates,
    templates,
    shouldUpdate,
  } = useContext(TemplatesContext);

  useEffect(() => {
    if (!isEmpty(templates)) return;
    initialLoadMyTemplates();
  }, []);

  useEffect(() => {
    if (!shouldUpdate) return;
    console.log('should update!!');
    initialLoadMyTemplates();
  }, [shouldUpdate]);

  return (
    <Switch>
      <Route exact path={`${match.path}/new`}>
        <FormikTemplatesContext initial>
          <NewTemplate />
        </FormikTemplatesContext>
      </Route>
      <Route exact path={`${match.path}/:id`}>
        <div>ID</div>
      </Route>
      <Route exact path={`${match.path}/:id/edit`}>
        <div>edit template</div>
      </Route>
      <Route exact path={`${match.path}/:id/view`}>
        <ViewTemplate
          templates={templates}
          deleteTemplate={deleteTemplateById}
          getTemplate={getTemplateByUniqueid}
        />
      </Route>
      <Route path='/'>
        <RootMyTemplates />
      </Route>
    </Switch>
  );
};

const RootMyTemplates = () => {
  //

  const {
    templates,
    isLoading,
    loadMoreMyTemplates,
    deleteTemplateById,
    searchMyTemplates,
    pagination,
  } = useContext(TemplatesContext);

  const formikCtx = useFormikContext();

  //  State
  const [fetch_configs, setFetchConfigs] = useState({
    type: TEMPLATES_LOAD_TYPES.INITIAL,
    filters: {
      term: '',
    },
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errors, setErrors] = useState({
    searchTerm: '',
  });

  const history = useHistory();
  const location = useLocation();

  // Handlers
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMoreMyTemplates(fetch_configs);
    setIsLoadingMore(false);
  };

  const handleSearchTermChange = e => {
    formikCtx.setFieldValue('searchTerm', e.target.value);
    setErrors(e => {
      return {
        ...e,
        searchTerm: '',
      };
    });
    setFetchConfigs(load => {
      return {
        ...load,
        type: !e.target.value
          ? TEMPLATES_LOAD_TYPES.INITIAL
          : TEMPLATES_LOAD_TYPES.SEARCH,
      };
    });
  };

  const handleSubmitSearch = async e => {
    if (!formikCtx.values.searchTerm)
      return setErrors(e => {
        return {
          ...e,
          searchTerm: 'Required',
        };
      });

    const _configs = {
      type: TEMPLATES_LOAD_TYPES.SEARCH,
      filters: {
        ...fetch_configs.filters,
        term: formikCtx.values.searchTerm,
      },
    };
    setFetchConfigs(_configs);
    formikCtx.setSubmitting(true);
    await searchMyTemplates(_configs);
    formikCtx.setSubmitting(false);
    console.log('Searching.. :');
    console.log(_configs);
  };

  return (
    <MobileBaseLayout
      title='My templates'
      backLabel='Dashboard'
      header={<Header />}
    >
      <SecondaryCard
        title='Event templates'
        subtitle='View, Edit, Add & delete'
        primaryAction={
          <Button
            className='text-blacks-dark font-medium'
            text={<span className='py-10'>Create a new template</span>}
            onClick={() => history.replace(`${location.pathname}/new`)}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                  clipRule='evenodd'
                />
              </svg>
            }
          />
        }
      >
        <div className='flex flex-col space-y-2'>
          {/* Search term - backend */}
          <div className='flex space-x-2.5 justify-start items-center'>
            <form className='w-full flex space-x-2.5 justify-start items-center'>
              <div className='flex flex-col space-y-1'>
                <FastInput
                  className='items-center'
                  noLabel
                  bg='bg-grays-light'
                  name='searchTerm'
                  placeholder='Search by template name'
                  size='large'
                  onChange={handleSearchTermChange}
                />
                {errors.searchTerm ? (
                  <div className='text-xxs pl-1 text-primary-dark'>
                    {errors.searchTerm}
                  </div>
                ) : null}
              </div>
              <Button
                disabled={formikCtx.isSubmitting}
                onClick={handleSubmitSearch}
                type='submit'
                className='text-xs'
                variant='success'
                text='Search'
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
            </form>
          </div>

          {/* Templates list */}

          {isLoading ? (
            <div className='text-xxs italic text-whites-dark py-14 font-light'>
              <LoadingWithDots
                flow='row'
                size='0.65rem'
                color='primary'
                label={
                  fetch_configs.type === TEMPLATES_LOAD_TYPES.SEARCH
                    ? 'Searching'
                    : 'Loading'
                }
              />
            </div>
          ) : (
            <>
              {!templates.length ? (
                <span className='text-xxs text-whites-dark font-light italic self-center py-14'>
                  No templates found
                </span>
              ) : (
                <div
                  style={{ minHeight: '150px' }}
                  className='max-h-80 w-full overflow-y-scroll flex flex-col space-y-4 text-whites-light'
                >
                  <TemplatesTable
                    templates={templates}
                    deleteTemplate={deleteTemplateById}
                  />
                  {/* Load-more / Pagination */}
                  <div className='flex flex-col space-y-1 items-center text-xs text-whites-light'>
                    {pagination.hasMore && (
                      <>
                        <Button
                          disabled={isLoadingMore}
                          onClick={handleLoadMore}
                          variant='light'
                          icon={
                            isLoadingMore ? null : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-3.5 w-3.5'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            )
                          }
                          text={
                            isLoadingMore ? (
                              <LoadingWithDots
                                label='Loading'
                                flow='row'
                                size='0.6rem'
                                color='inherit'
                              />
                            ) : (
                              'Load more'
                            )
                          }
                        />
                        <span className='text-xxs font-light text-whites-dark tracking-tight'>
                          {pagination.remaining} remaining
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </SecondaryCard>
    </MobileBaseLayout>
  );
};

export default MyTemplates;

const NewTemplate = () => {
  //

  const history = useHistory();

  const {
    values,
    handleChange,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    errors,
  } = useFormikContext();

  const { newTemplate } = useContext(TemplatesContext);
  const { setToast } = useContext(ToastContext);

  const [options, setOptions] = useState({
    rounds: false,
    points: false,
    description: false,
    teams: false,
    prizes: false,
  });

  // Handlers
  const handleCreateTemplate = async () => {
    console.log(isValidTemplate());
    if (!isValidTemplate())
      return setToast({
        variant: 'error',
        message:
          'Error creating template. Make sure no field is left empty, or please check the fields for any corresponding error. ',
      });
    setSubmitting(true);
    await newTemplate(values, options);
    setSubmitting(false);
    history.replace('/dashboard/my-templates');
  };

  // Helpers
  const containsNothing = () =>
    !options.points &&
    !options.description &&
    !options.rounds &&
    !options.teams &&
    !options.prizes;
  const isValidTemplate = () => {
    let valid = true;
    // if contains nothing error
    if (containsNothing()) valid = false;
    // if desc. toggled, check errors.description. if err.desc exists then not valid
    if (options.description) valid = errors?.description ? false : true;
    // if rounds toggled, check errors.rounds
    if (options.rounds) valid = errors?.rounds ? false : true;
    // if points toggled, check errors.pointPerKill & errors.pointsDistribution[]
    if (options.points)
      valid = errors?.pointPerKill || errors?.pointsDistribution ? false : true;
    // if teams toggled, check errors.teams
    if (options.teams) valid = errors?.teams ? false : true;
    // if prizes toggled, check errors.prizepool & errors.prizepoolDistribution[]
    if (options.prizes)
      valid = errors?.prizepool || errors?.prizepoolDistribution ? false : true;
    return valid;
  };

  // renderers
  const renderActionButton = () => {
    if (containsNothing())
      return (
        <Button
          disabled={true}
          className='self-end opacity-50 font-light italic text-xs text-whites-light leading-relaxed'
          text='Empty template..'
          variant='dark'
        />
      );

    if (isSubmitting)
      return (
        <Button
          disabled={true}
          className='self-end text-xs font-medium text-blacks-dark'
          text={
            <LoadingWithDots
              flow='row'
              label='creating'
              size='0.65rem'
              color='inherit'
            />
          }
          variant='success'
          icon={null}
        />
      );

    return (
      <Button
        onClick={handleCreateTemplate}
        className='self-end text-xs font-medium text-blacks-dark'
        text='Create'
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
    );
  };

  return (
    <MobileBaseLayout
      header={<Header />}
      title={
        <>
          My templates <span className='font-sans'>/</span> New
        </>
      }
      backLabel='My templates'
      backPath='/dashboard/my-templates'
    >
      <SecondaryCard
        title='Create a new template'
        primaryAction={renderActionButton()}
      >
        <div className='flex flex-col space-y-4 text-whites-light'>
          <div className='flex flex-col space-y-4 pb-4'>
            <FastInput
              name='name'
              label='Template name'
              type='text'
              size='large'
              autoFocus
            />

            <MarkdownInput
              maxChar={300}
              name='templateDescription'
              label='Template description'
              secondaryLabel={
                <span className='flex space-x-1 justify-center items-center text-whites-light'>
                  <span>supports Markdown</span>{' '}
                  <Markdown className='pt-0.5 w-4 h-3' />
                </span>
              }
            />

            <SwitchInput
              label='Visible'
              secondaryLabel={
                values.visible ? (
                  <>
                    Template can be used
                    <span className='font-semibold'> by others</span>
                  </>
                ) : (
                  <>
                    Template only usable
                    <span className='font-semibold'> by you</span>
                  </>
                )
              }
              checked={values.visible}
              onChange={handleChange}
              name='visible'
              color='secondary'
              size='small'
            />

            <div className='flex justify-center'>
              <Hr className='bg-whites-dark opacity-10 w-4/6 my-3' />
            </div>
            {/* Options */}
            <div className='flex flex-col space-y-2 bg-dark-background shadow-sm max-w-max px-4 py-2.5 border-l border-success rounded-tr-md rounded-br-md '>
              <div className='text-xxs tracking-tight text-whites-dark'>
                What will your template contain?
              </div>
              <div className='flex flex-wrap justify-start items-center '>
                <div className='flex flex-col px-4 pb-1.5 space-y-1'>
                  <span className='text-xs'>Description</span>
                  <MuiSwitch
                    color='secondary'
                    checked={options.description}
                    onChange={() => {
                      {
                        setOptions(o => {
                          return { ...o, description: !o.description };
                        });
                      }
                    }}
                    size='small'
                  />
                </div>
                <div className='flex flex-col px-4 pb-1.5 space-y-1'>
                  <span className='text-xs'>Rounds</span>
                  <MuiSwitch
                    color='secondary'
                    checked={options.rounds}
                    onChange={() => {
                      setOptions(o => {
                        return { ...o, rounds: !o.rounds };
                      });
                    }}
                    size='small'
                  />
                </div>
                <div className='flex flex-col px-4 pb-1.5 space-y-1'>
                  <span className='text-xs'>Points</span>
                  <MuiSwitch
                    color='secondary'
                    checked={options.points}
                    onChange={() => {
                      setOptions(o => {
                        return { ...o, points: !o.points };
                      });
                    }}
                    size='small'
                  />
                </div>
                <div className='flex flex-col px-4 pb-1.5 space-y-1'>
                  <span className='text-xs'>Teams</span>
                  <MuiSwitch
                    color='secondary'
                    checked={options.teams}
                    onChange={() => {
                      setOptions(o => {
                        return { ...o, teams: !o.teams };
                      });
                    }}
                    size='small'
                  />
                </div>
                <div className='flex flex-col px-4 pb-1.5 space-y-1'>
                  <span className='text-xs'>Prizes</span>
                  <MuiSwitch
                    color='secondary'
                    checked={options.prizes}
                    onChange={() => {
                      setOptions(o => {
                        return { ...o, prizes: !o.prizes };
                      });
                    }}
                    size='small'
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-6 pt-3'>
              {containsNothing() && (
                <div className='flex justify-center items-center py-16 bg-grays-light bg-opacity-50 w-full text-whites-dark'>
                  <span className='italic text-xxs text-center opacity-80'>
                    Your template contains nothing...
                  </span>
                </div>
              )}
              {options.description && (
                <div className='flex flex-col space-y-4'>
                  <MarkdownInput
                    name='description'
                    label='Description, about & details'
                    secondaryLabel={
                      <span className='flex space-x-1 justify-center items-center text-whites-light'>
                        <span>supports Markdown</span>{' '}
                        <Markdown className='pt-0.5 w-4 h-3' />
                      </span>
                    }
                  />
                  <Hr className='text-whites-dark opacity-10 w-3/12 ml-2 self-start' />
                </div>
              )}
              {options.rounds && (
                <div className='flex flex-col space-y-4'>
                  <InputSlider
                    marks={[
                      { value: 1 },
                      { value: 4 },
                      { value: 6 },
                      { value: 8 },
                      { value: 12 },
                      { value: 16 },
                    ]}
                    max={16}
                    step={null}
                    color='secondary'
                    type='number'
                    label='Rounds'
                    name='rounds'
                    placeholder='1'
                    value={values.rounds}
                    setFieldValue={setFieldValue}
                  />

                  <Hr className='text-whites-dark opacity-10 w-3/12 ml-2 self-start' />
                </div>
              )}
              {options.points && (
                <div className='flex flex-col space-y-4'>
                  <FastInput
                    label='Points per kill'
                    type='number'
                    name='pointPerKill'
                    min={0}
                    size='small'
                  />
                  <div className='flex flex-col space-y-1'>
                    <label
                      htmlFor='points distribution'
                      className='pl-1 text-xs'
                    >
                      Points distribution
                    </label>
                    <PointsFields />
                  </div>
                </div>
              )}
              {options.teams && (
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-col space-y-1'>
                    <div className='w-full flex items-center'>
                      <span className='pl-1 text-xs'>Participating teams</span>
                    </div>
                    <TeamsFieldsArray pick={false} />
                  </div>
                  <Hr className='text-whites-dark opacity-10 w-3/12 ml-2 self-start' />
                </div>
              )}
              {options.prizes && (
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-col space-y-1'>
                    <div className='w-full flex items-center'>
                      <span className='pl-1 text-xs'>Participating teams</span>
                    </div>
                    <PrizesForm cancelable={false} />
                  </div>
                  <Hr className='text-whites-dark opacity-10 w-3/12 ml-2 self-start' />
                </div>
              )}
            </div>
          </div>
        </div>
      </SecondaryCard>
    </MobileBaseLayout>
  );
};

const TemplatesTable = ({ templates, deleteTemplate }) => {
  //

  let history = useHistory();
  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  // Table stuff
  const columns = React.useMemo(() => {
    return [
      {
        Header: '#',
        accessor: 'id', // accessor is the "key" in the data
        id: 'index',
      },
      {
        Header: 'Template',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Use',
        accessor: 'uniqueid',
        id: 'use',
        disableSortBy: true,
      },
      {
        Header: 'Delete',
        accessor: 'uniqueid',
        id: 'delete',
        disableSortBy: true,
      },
    ];
  }, []);
  const data = React.useMemo(() => {
    return templates.map((template, index) => {
      return { ...template, id: index + 1 };
    });
  }, [templates]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  // Handlers
  const handleDeleteTemplate = ({
    value,
    row: {
      values: { name },
    },
  }) => {
    console.log('deleting...');
    setModalComponent(
      <ConfirmationModal
        description={`Are you sure you want to delete ${name} template?`}
        confirmVariant='error'
        confirm={() => deleteTemplate(value, name, false)}
        cancel={offModal}
      />
    );
    setModalProps({
      title: `Delete template`,
      variant: 'error',
      actions: null,
      secondary: null,
    });
    setModal('content');
  };

  return (
    <table
      {...getTableProps}
      className='text-whites-light w-full text-center align-middle'
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr className='w-full' {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                className='text-center text-xxs px-2 font-semibold py-2 border-b border-dark-backgroundDarker'
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr
              className={`${index % 2 ? '' : 'bg-grays-light'} text-xxs`}
              {...row.getRowProps()}
            >
              {row.cells.map(cell => {
                if (cell.column.id === 'index')
                  return (
                    <td
                      className='text-center text-xxs py-2 px-4 relative'
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                if (cell.column.id === 'use')
                  return (
                    <td
                      className='text-center py-2 relative'
                      {...cell.getCellProps()}
                    >
                      <Link
                        to={`/dashboard/new-event/?templateId=${cell.value}&templateName=${cell.row.original.name}`}
                      >
                        <Button
                          disabled
                          onClick={null}
                          className='dynamic-center'
                          iconOnly
                          variant='success'
                          icon={
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-3.5 w-3.5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z' />
                              <path d='M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z' />
                            </svg>
                          }
                        />
                      </Link>
                    </td>
                  );
                if (cell.column.id === 'delete')
                  return (
                    <td
                      className=' text-center py-2 relative'
                      {...cell.getCellProps()}
                    >
                      <Button
                        onClick={() => handleDeleteTemplate(cell)}
                        className='dynamic-center'
                        iconOnly
                        variant='error'
                        icon={
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-3 w-3'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                        }
                      />
                    </td>
                  );
                if (cell.column.id === 'name')
                  return (
                    <td className='text-left py-2' {...cell.getCellProps()}>
                      <div className='px-2 pb-0.5 w-36 whitespace-nowrap overflow-x-scroll'>
                        <Link
                          to={`/dashboard/my-templates/${cell.row.original.uniqueid}/view`}
                          className='underline text-info'
                        >
                          {cell.render('Cell')}
                        </Link>
                      </div>
                    </td>
                  );
                return (
                  <td className='text-left py-2' {...cell.getCellProps()}>
                    <div className='px-2 pb-0.5 w-36 whitespace-nowrap overflow-x-scroll'>
                      {cell.render('Cell')}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const ViewTemplate = ({ deleteTemplate, getTemplate }) => {
  //

  const { id } = useParams();
  const history = useHistory();

  const [template, setTemplate] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  useEffect(() => {
    if (!id) return history.replace('/404');
    const _getTemplate = async () => {
      try {
        setIsLoading(true);
        const template = await getTemplate(id);
        setTemplate(template);
      } catch (error) {
        setTemplate({});
        return history.replace('/templates');
      } finally {
        setIsLoading(false);
      }
    };

    _getTemplate();
  }, [id]);

  // handlers
  const handleDeleteTemplate = (uniqueid, name) => {
    setModalComponent(
      <ConfirmationModal
        description={`Are you sure you want to delete ${name} template?`}
        confirmVariant='error'
        confirm={() => deleteTemplate(uniqueid, name, true)}
        cancel={offModal}
      />
    );
    setModalProps({
      title: `Delete template`,
      variant: 'error',
      actions: null,
      secondary: null,
    });
    setModal('content');
  };

  if (!template) return <Redirect to='/dashboard/my-templates' />;

  return (
    <MobileBaseLayout
      header={<Header />}
      title={
        <span className='capitalize'>{isLoading ? '...' : template.name}</span>
      }
      backLabel='My templates'
      backPath='/dashboard/my-templates'
    >
      {isLoading ? (
        <div className='flex flex-col pt-40 text-whites-dark text-xs'>
          <LoadingWithDots
            label='Loading template'
            size='0.7rem'
            color='primary'
          />
        </div>
      ) : (
        <SecondaryCard
          title='Template details'
          primaryAction={
            <Button
              onClick={() =>
                history.replace(
                  `/dashboard/new-event/?templateId=${template?.uniqueid}&templateName=${template?.name}`
                )
              }
              className='text-xs text-whites-light'
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z' />
                  <path d='M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z' />
                </svg>
              }
              text='Use template'
              variant='success'
            />
          }
          secondaryAction={
            <Button
              onClick={() =>
                handleDeleteTemplate(template.uniqueid, template.name)
              }
              textOnly
              className='text-xs text-primary-light font-semibold'
              text='Delete'
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              variant='error'
            />
          }
        >
          <div className='flex flex-col space-y-6 text-whites-light text-xs'>
            <div className='tracking-wide flex flex-col space-y-4'>
              <div className='flex flex-col'>
                <div className='text-xxs italic font-light text-whites-dark tracking-tight'>
                  Template name
                </div>
                <div className='font-semibold'>{template.name}</div>
              </div>
              <div className='flex flex-col'>
                <div className='text-xxs italic font-light text-whites-dark tracking-tight'>
                  Template description
                </div>
                <div
                  className='bg-dark-backgroundDark pb-5 pt-2 px-2.5 rounded-md mt-1'
                  style={{ minHeight: '120px' }}
                >
                  <ReactMarkdown
                    disallowedElements={['img']}
                    className='markdown mobile text-sm'
                    remarkPlugins={[remarkGfm]}
                  >
                    {template.description}
                  </ReactMarkdown>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='text-xxs italic font-light text-whites-dark tracking-tight'>
                  Template type
                </div>
                <div>
                  {template.visible ? (
                    <div>
                      <span>Public </span>
                      <span className='text-xxs text-whites-dark'>
                        Visible and can be used by others.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>Private </span>
                      <span className='text-xxs text-whites-dark'>
                        Usable by only you.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='flex items-center pr-1.5 space-x-3.5 justify-center text-xs text-whites-light'>
              <div className='flex items-center space-x-0.5'>
                <TinySquare size='tiny' className='bg-primary-dark' />
                <span className='whitespace-nowrap'>
                  Template's event configurations
                </span>{' '}
              </div>
              <Hr className='self-center w-full bg-primary-light text-primary-light opacity-50' />
            </div>
            <div className='flex flex-col space-y-3.5'>
              <div className='tracking-wide flex flex-col space-y-6'>
                {template.template?.description && (
                  <div className='flex flex-col'>
                    <div className='text-xxs italic text-whites-dark tracking-tight'>
                      Description
                    </div>
                    <div className='bg-dark-backgroundDark pb-5 pt-2 px-2.5 rounded-md mt-1'>
                      <ReactMarkdown
                        disallowedElements={['img']}
                        className='markdown mobile text-sm'
                        remarkPlugins={[remarkGfm]}
                      >
                        {template.template.description}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
                {template.template?.rounds && (
                  <div className='flex flex-col space-y-1'>
                    <div className='text-xxs italic text-whites-dark tracking-tight'>
                      Rounds
                    </div>
                    <div className='font-semibold px-4 py-1.5 rounded-md bg-dark-background max-w-min'>
                      {template.template.rounds}
                    </div>
                  </div>
                )}
                {template.template?.pointPerKill && (
                  <div className='flex flex-col space-y-1'>
                    <div className='text-xxs italic text-whites-dark tracking-tight'>
                      Points per kill
                    </div>
                    <div className='font-semibold px-4 py-1.5 rounded-md bg-dark-background max-w-min'>
                      {template.template.pointPerKill}
                    </div>
                  </div>
                )}
                {template.template?.pointsDistribution && (
                  <div className='flex flex-col space-y-2'>
                    <div className='text-xs italic text-whites-dark tracking-tight'>
                      Points distribution
                    </div>
                    <div className='py-3.5 px-2 bg-dark-backgroundDark rounded-md'>
                      <GridList
                        items={template.template.pointsDistribution}
                        labeledItems
                        label='Place'
                        isOrdinal
                      />
                    </div>
                  </div>
                )}
                {template.template?.teams && (
                  <div className='flex flex-col space-y-2'>
                    <div className='text-xs italic text-whites-dark tracking-tight'>
                      Participating teams
                    </div>
                    <div className='py-3.5 px-2 bg-dark-backgroundDark rounded-md'>
                      <GridList
                        labeledItems
                        label='Team'
                        items={template.template.teams.map(t => t.name)}
                      />
                    </div>
                  </div>
                )}
                {template.template?.hasPrizepool && (
                  <div className='flex flex-col space-y-2'>
                    <div className='text-xs italic text-whites-dark tracking-tight'>
                      Prizepool distribution
                    </div>
                    <div className='py-3.5 px-2 bg-dark-backgroundDark rounded-md'>
                      <div className='flex items-center space-x-3 mt-2 mb-4'>
                        <span className='whitespace-nowrap overflow-x-scroll text-sm'>
                          {template.template.prizepool}
                          {
                            _currencies.find(
                              currency =>
                                currency.code ===
                                template.template.prizepoolCurrency
                            ).symbol
                          }{' '}
                          Total prizepool
                        </span>
                        <Hr className='flex-grow bg-dark-backgroundDarker opacity-5' />
                      </div>
                      <GridList
                        items={template.template.prizepoolDistribution}
                        labeledItems
                        label='Place'
                        isOrdinal
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SecondaryCard>
      )}
    </MobileBaseLayout>
  );
};
