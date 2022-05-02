import { useFormikContext } from "formik";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
  Link,
} from "react-router-dom";
import Button from "../../Components/actions/Button";
import CopyToClipboard from "../../Components/actions/CopyToClipboard";
import FastInput from "../../Components/forms/FastInput";
import Header from "../../Components/layouts/Header";
import Hr from "../../Components/layouts/Hr";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import FormikDiscordChannelsContext from "../../Context/Formik/FormikDiscordChannelsContext";
import IntegrationsContext from "../../Context/Integrations/IntegrationsContext";
import ModalContext from "../../Context/Modal/ModalContext";
import ToastContext from "../../Context/Toast/ToastContext";
import ConfirmationModal from "../../Components/actions/ConfirmationModal";
import { useTable, useSortBy } from "react-table";

// images
import Webhooks1 from "../../Images/webhooks-1.png";
import Webhooks2 from "../../Images/webhooks-2.png";
import Webhooks3 from "../../Images/webhooks-3.png";
import Webhooks4 from "../../Images/webhooks-4.png";
import Webhooks5 from "../../Images/webhooks-5.png";
import Nightbot1 from "../../Images/nightbot-1.png";

// Other
import { isEmpty } from "lodash";
import { fromDate, generateNightbotCommand, isPast } from "../../lib/utils";
import LiveIndicator from "../../Components/layouts/LiveIndicator";
import Twitch from "../../Images/Twitch";
import Discord from "../../Images/Discord";
import PrimaryCard from "../../Components/layouts/PrimaryCard";

const MyIntegrations = () => {
  //

  const match = useRouteMatch();
  const { setToast } = useContext(ToastContext);
  const { setModal, setModalComponent, setModalProps } =
    useContext(ModalContext);
  const {
    newDiscordChannel,
    getDiscordChannels,
    deleteDiscordChannelById,
    updateDiscordChannelById,
    discordWebhooks,
    isLoading,
    pingDiscordChannel,
    shouldUpdate,
    getNightbotEvents,
    loadMoreNightbotEvents,
    nightbot,
  } = useContext(IntegrationsContext);

  useEffect(() => {
    if (!isEmpty(discordWebhooks)) return;
    getDiscordChannels();
  }, []);

  useEffect(() => {
    if (!isEmpty(nightbot.events)) return;
    getNightbotEvents();
  }, []);

  useEffect(() => {
    if (!shouldUpdate) return;
    getDiscordChannels();
  }, [shouldUpdate]);

  return (
    <Switch>
      <Route exact path={`${match.path}/new`}>
        <FormikDiscordChannelsContext initial>
          <NewChannel
            setModal={setModal}
            setModalProps={setModalProps}
            setModalComponent={setModalComponent}
            isLoading={isLoading}
            newDiscordChannel={newDiscordChannel}
            setToast={setToast}
            discordWebhooks={discordWebhooks}
          />
        </FormikDiscordChannelsContext>
      </Route>
      <Route exact path={`${match.path}/:id`}>
        <div>ID</div>
      </Route>
      <Route exact path={`${match.path}/:id/edit`}>
        <FormikDiscordChannelsContext initial={false} values={{}}>
          <EditChannel
            setModal={setModal}
            isLoading={isLoading}
            setModalComponent={setModalComponent}
            updateDiscordChannelById={updateDiscordChannelById}
            setToast={setToast}
            discordWebhooks={discordWebhooks}
          />
        </FormikDiscordChannelsContext>
      </Route>
      <Route path="/">
        <FormikDiscordChannelsContext initial>
          <RootMyIntegrations
            setToast={setToast}
            setModal={setModal}
            setModalProps={setModalProps}
            setModalComponent={setModalComponent}
            loadMoreNightbotEvents={loadMoreNightbotEvents}
            isLoading={isLoading}
            shouldUpdate={shouldUpdate}
            getDiscordChannels={getDiscordChannels}
            discordWebhooks={discordWebhooks}
            pingDiscordChannel={pingDiscordChannel}
            deleteDiscordChannelById={deleteDiscordChannelById}
            nightbot={nightbot}
          />
        </FormikDiscordChannelsContext>
      </Route>
    </Switch>
  );
};

export default MyIntegrations;

const RootMyIntegrations = ({
  setToast,
  setModal,
  setModalProps,
  setModalComponent,
  discordWebhooks,
  isLoading,
  shouldUpdate,
  loadMoreNightbotEvents,
  pingDiscordChannel,
  getDiscordChannels,
  deleteDiscordChannelById,
  nightbot,
}) => {
  //

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  let history = useHistory();
  let match = useRouteMatch();

  // handlers
  const handleHowNightbotWorks = () => {
    setModalComponent(<HowNightbotWorksModal />);
    setModalProps({
      title: "Hooking events to Nightbot commands",
      variant: "info",
      action: null,
      secondary: null,
    });
    setModal("full");
  };

  const handleHowDiscordWorks = () => {
    setModalComponent(<HowDiscordWorksModal />);
    setModalProps({
      title: "Hooking discord channels",
      variant: "info",
      action: null,
      secondary: null,
    });
    setModal("full");
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMoreNightbotEvents();
    setIsLoadingMore(false);
  };

  useEffect(() => {
    if (!shouldUpdate) return;
    getDiscordChannels();
  }, [shouldUpdate]);

  return (
    <MobileBaseLayout
      header={<Header />}
      backPath="/dashboard"
      backLabel="Dashboard"
      title="My integrations"
    >
      <div className="flex flex-col space-y-4">
        {/* Discord */}
        <SecondaryCard
          title={
            <div className="flex space-x-2 items-center">
              <Discord className="w-3.5 h-3" />
              <span>Discord</span>
            </div>
          }
          subtitle="Link, edit & remove channels"
          primaryAction={
            <Button
              onClick={() =>
                history.push(`${match.url}dashboard/my-integrations/new`)
              }
              text="Add a channel"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          }
          secondaryAction={
            <Button
              onClick={handleHowDiscordWorks}
              className="text-info"
              text="How it works?"
              textOnly
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          }
        >
          <div className="flex flex-col space-y-4">
            {isLoading ? (
              <div className="text-whites-light text-xxs w-full py-10 flex justify-center items-center font-light">
                <LoadingWithDots
                  label="Loading channels"
                  size="0.6rem"
                  flow="row"
                  color="inherit"
                />
              </div>
            ) : (
              <div>
                {discordWebhooks.length === 0 ? (
                  <div className="w-full py-10 flex justify-center items-center text-xxs font-light text-whites-dark opacity-50">
                    No channels, please add from below
                  </div>
                ) : (
                  <div
                    style={{ minHeight: "150px" }}
                    className="max-h-80 w-full overflow-y-scroll flex flex-col space-y-2 text-whites-light"
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="text-xxs border-l leading-loose text-whites-dark border-info rounded-sm px-2">
                        Set channels to be notified through event page
                      </div>
                      <DiscordWebHooksTable
                        hooks={discordWebhooks}
                        pingChannel={pingDiscordChannel}
                        deleteChannel={deleteDiscordChannelById}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <Hr className="w-4/5 text-whites-dark self-center opacity-10" />
          </div>
        </SecondaryCard>
        {/* Nightbot */}
        <SecondaryCard
          title={
            <div className="flex space-x-2 items-center">
              <Twitch height="12" width="12" />
              <span>Nightbot</span>
            </div>
          }
          subtitle="Scores command for Twitch chat"
          secondaryAction={
            <Button
              className="text-info"
              onClick={handleHowNightbotWorks}
              text="How it works?"
              textOnly
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          }
        >
          <div className="flex flex-col space-y-4">
            {nightbot.isLoading ? (
              <div className="text-whites-light text-xxs w-full py-10 flex justify-center items-center font-light">
                <LoadingWithDots
                  label="Loading events"
                  size="0.6rem"
                  flow="row"
                  color="inherit"
                />
              </div>
            ) : (
              <div>
                {nightbot.events.length === 0 ? (
                  <div className="w-full py-10 flex justify-center items-center text-xxs font-light text-whites-dark opacity-50">
                    You have no "ongoing" or "upcoming" events ...
                  </div>
                ) : (
                  <div
                    style={{ minHeight: "150px" }}
                    className="max-h-80 w-full overflow-y-scroll flex flex-col space-y-4 text-whites-light"
                  >
                    <NightbotEventsTable
                      events={nightbot.events}
                      setToast={setToast}
                    />
                    {/* Load-more / Pagination */}
                    <div className="flex flex-col space-y-1 items-center text-xs text-whites-light">
                      {nightbot.pagination.hasMore && (
                        <>
                          <Button
                            disabled={isLoadingMore}
                            onClick={handleLoadMore}
                            variant="light"
                            icon={
                              isLoadingMore ? null : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )
                            }
                            text={
                              isLoadingMore ? (
                                <LoadingWithDots
                                  label="Loading"
                                  flow="row"
                                  size="0.6rem"
                                  color="inherit"
                                />
                              ) : (
                                "Load more"
                              )
                            }
                          />
                          <span className="text-xxs font-light text-whites-dark tracking-tight">
                            {nightbot.pagination.remaining} events remaining
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <Hr className="w-4/5 text-whites-dark self-center opacity-10" />
            <div className="flex items-center space-x-1 text-whites-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xxs tracking-tight">
                Can also be found on each event page {`>`} settings
              </span>
            </div>
          </div>
        </SecondaryCard>
      </div>
    </MobileBaseLayout>
  );
};

const NewChannel = ({
  setModal,
  setModalProps,
  setModalComponent,
  newDiscordChannel,
  setToast,
}) => {
  //

  let history = useHistory();

  const {
    initialValues,
    setValues,
    values,
    isValid,
    setSubmitting,
    isSubmitting,
    setFieldTouched,
  } = useFormikContext();

  // Handlers
  const handleNewChannel = async () => {
    if (!isValid) {
      setFieldTouched("server");
      setFieldTouched("channel");
      setFieldTouched("webhookUrl");
      return setToast({
        variant: "error",
        message:
          "Unable to create a new channel, invalid values. Check the fields for any corresponding errors",
      });
    }

    setSubmitting(true);
    await newDiscordChannel({
      server: values.server,
      channel: values.channel,
      webhookUrl: values.webhookUrl,
    });
    setValues(initialValues, false);
    history.replace("/dashboard/my-integrations");
    setSubmitting(false);
  };

  const handleHowToFindUrl = () => {
    setModalComponent(<HowToFindUrlModal />);
    setModalProps({
      title: "How to find Discord's Webhook URL",
      variant: "info",
      action: null,
      secondary: null,
    });
    setModal("full");
  };

  return (
    <MobileBaseLayout
      header={<Header />}
      backPath="/dashboard/my-integrations"
      backLabel="My Integrations"
      title={
        <span>
          My Integrations<span className="font-sans px-0.5">/</span>New
        </span>
      }
    >
      <SecondaryCard
        title="Add a new a channel"
        primaryAction={
          <Button
            disabled={isSubmitting}
            onClick={handleNewChannel}
            className="self-end text-xs font-medium text-blacks-dark"
            text={
              isSubmitting ? (
                <LoadingWithDots
                  flow="row"
                  label="creating"
                  size="0.65rem"
                  color="inherit"
                />
              ) : (
                "Create"
              )
            }
            variant="success"
            icon={
              !isSubmitting ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                ""
              )
            }
          />
        }
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <FastInput
              name="server"
              label="Server name"
              type="text"
              size="large"
            />
            <FastInput
              name="channel"
              label="Channel name"
              type="text"
              size="large"
            />
            <FastInput
              name="webhookUrl"
              label="Channel Webhook URL"
              secondaryLabel={
                <Button
                  text="How do I find that?"
                  onClick={handleHowToFindUrl}
                  textOnly
                  className="flex justify-center items-center"
                />
              }
              type="text"
              size="full"
            />
          </div>
        </div>
      </SecondaryCard>
    </MobileBaseLayout>
  );
};

const EditChannel = ({
  setModal,
  setModalComponent,
  updateDiscordChannelById,
  setToast,
  discordWebhooks,
}) => {
  //

  let history = useHistory();
  let { id } = useParams();

  const {
    initialValues,
    setValues,
    values,
    isValid,
    setSubmitting,
    isSubmitting,
    setFieldTouched,
  } = useFormikContext();

  // Handlers
  const handleEditChannel = async () => {
    if (!isValid) {
      setFieldTouched("server");
      setFieldTouched("channel");
      setFieldTouched("webhookUrl");
      return setToast({
        variant: "error",
        message:
          "Unable to create a new channel, invalid values. Check the fields for any corresponding errors",
      });
    }

    setSubmitting(true);
    await updateDiscordChannelById(values.uniqueid, {
      server: values.server,
      channel: values.channel,
      webhookUrl: values.webhookUrl,
    });
    setValues(initialValues, false);
    history.replace("/dashboard/my-integrations");
    setSubmitting(false);
  };

  const handleHowToFindUrl = () => {
    setModalComponent(<HowToFindUrlModal />);
    setModal("full");
  };

  useEffect(() => {
    setValues(discordWebhooks.find((hook) => hook.uniqueid === id));
  }, []);

  useEffect(() => {
    if (isEmpty(values)) return history.replace("/dashboard/my-integrations");
  }, [id]);

  return (
    <MobileBaseLayout
      header={<Header />}
      backPath="/dashboard/my-integrations"
      backLabel="My Integrations"
      title={
        <span>
          My Integrations<span className="font-sans px-0.5">/</span>
          Edit
        </span>
      }
    >
      <SecondaryCard
        title="Edit a channel"
        primaryAction={
          <Button
            disabled={isSubmitting}
            onClick={handleEditChannel}
            className="self-end text-xs font-medium text-blacks-dark"
            text={
              isSubmitting ? (
                <LoadingWithDots
                  flow="row"
                  label="Updating"
                  size="0.65rem"
                  color="inherit"
                />
              ) : (
                "Edit"
              )
            }
            variant="success"
            icon={
              !isSubmitting ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                ""
              )
            }
          />
        }
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <FastInput
              name="server"
              label="Server name"
              type="text"
              size="large"
            />
            <FastInput
              name="channel"
              label="Channel name"
              type="text"
              size="large"
            />
            <FastInput
              name="webhookUrl"
              label="Channel Webhook URL"
              secondaryLabel={
                <Button
                  text="How do I find that?"
                  onClick={handleHowToFindUrl}
                  textOnly
                  className="flex justify-center items-center"
                />
              }
              type="text"
              size="full"
            />
          </div>
        </div>
      </SecondaryCard>
    </MobileBaseLayout>
  );
};

const DiscordWebHooksTable = ({ hooks, pingChannel, deleteChannel }) => {
  //

  let history = useHistory();

  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  // Handlers
  const handleEditChannel = ({ value }) => {
    history.replace(`/dashboard/my-integrations/${value}/edit`);
  };

  const handlePingChannel = ({
    value,
    row: {
      values: { channel },
    },
    row: {
      values: { server },
    },
  }) => {
    pingChannel(value, channel, server);
  };

  const handleDeleteChannel = ({
    value,
    row: {
      values: { channel, server },
    },
  }) => {
    console.log(server);
    setModalComponent(
      <div className="flex flex-col text-xs w-74 justify-center items-start space-y-4 py-4 px-6 text-whites-light">
        <div className=" text-whites-light  whitespace-pre-line">
          Are you sure you want to
        </div>
        <div className="font-bold">
          {server} - {channel}
        </div>
      </div>
    );

    setModalProps({
      title: "Delete discord webhook",
      variant: "error",
      action: (
        <Button
          onClick={() => {
            offModal();
            deleteChannel(value, channel);
          }}
          text="Confirm"
          variant="error"
        />
      ),
      secondary: (
        <Button onClick={offModal} text="Cancel" variant="dark" textOnly />
      ),
    });

    setModal("content");
  };

  // Table stuff
  const columns = React.useMemo(() => {
    return [
      {
        Header: "#",
        accessor: "id", // accessor is the "key" in the data
        id: "index",
      },
      {
        Header: "server",
        accessor: "server", // accessor is the "key" in the data
      },
      {
        Header: "Channel",
        accessor: "channel",
      },
      {
        Header: "Ping",
        accessor: "uniqueid",
        id: "ping",
      },
      {
        Header: "Edit",
        accessor: "uniqueid",
        id: "edit",
      },
      {
        Header: "Delete",
        accessor: "uniqueid",
        id: "delete",
      },
    ];
  }, []);
  const data = React.useMemo(() => {
    return hooks.map((hook, index) => {
      return { ...hook, id: index + 1 };
    });
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <table
      {...getTableProps}
      className="text-whites-light w-full text-center align-middle"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="w-full" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className="text-center text-xxs font-semibold py-2 border-b border-dark-backgroundDarker"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
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
              className={`${index % 2 ? "" : "bg-grays-light"} text-xxs`}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                if (cell.column.id === "index")
                  return (
                    <td
                      className="text-center text-xxs py-2 relative"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                if (cell.column.id === "ping")
                  return (
                    <td
                      className="text-center py-2 relative"
                      {...cell.getCellProps()}
                    >
                      <Button
                        onClick={() => handlePingChannel(cell)}
                        className="dynamic-center"
                        iconOnly
                        variant="light"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-whites-dark"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        }
                      />
                    </td>
                  );
                if (cell.column.id === "edit")
                  return (
                    <td
                      className="text-center py-2 relative"
                      {...cell.getCellProps()}
                    >
                      <Button
                        onClick={() => handleEditChannel(cell)}
                        className="dynamic-center"
                        iconOnly
                        variant="light"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-whites-dark"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path
                              fillRule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        }
                      />
                    </td>
                  );
                if (cell.column.id === "delete")
                  return (
                    <td
                      className=" text-center py-2 relative"
                      {...cell.getCellProps()}
                    >
                      <Button
                        onClick={() => handleDeleteChannel(cell)}
                        className="dynamic-center"
                        iconOnly
                        variant="error"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        }
                      />
                    </td>
                  );
                return (
                  <td className=" text-center py-2" {...cell.getCellProps()}>
                    <div className="px-1 pb-0.5 w-24 whitespace-nowrap overflow-x-scroll">
                      {cell.render("Cell")}
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

const NightbotEventsTable = ({ events, setToast }) => {
  //

  let history = useHistory();

  // Table stuff
  const columns = React.useMemo(() => {
    return [
      {
        Header: "#",
        accessor: "id", // accessor is the "key" in the data
        id: "index",
      },
      {
        Header: "Event",
        accessor: "name", // accessor is the "key" in the data
        id: "name", // accessor is the "key" in the data
      },
      {
        Header: "Status",
        accessor: "datetime",
        id: "datetime",
      },
      {
        Header: "Command",
        accessor: "uniqueid",
        id: "copy",
      },
    ];
  }, []);
  const data = React.useMemo(() => {
    return events.map((event, i) => {
      return { ...event, id: i + 1 };
    });
  }, [events]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  // handlers
  const handleNoCommand = () => {
    setToast({
      variant: "warning",
      message:
        "Apologies, there was an unexpected error while generating the Nightbot command setup. Please contact us.",
    });
  };

  return (
    <table
      {...getTableProps}
      className="text-whites-light w-full text-center align-middle"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="w-full" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className="text-center text-xxs font-semibold py-2 border-b border-dark-backgroundDarker"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
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
              className={`${index % 2 ? "" : "bg-grays-light"} text-xxs`}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                if (cell.column.id === "index")
                  return (
                    <td
                      className="text-center text-xxs py-2 relative"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                if (cell.column.id === "copy")
                  return (
                    <td
                      className="flex justify-center items-center text-center py-2 relative"
                      {...cell.getCellProps()}
                    >
                      {cell.row.original.nightbotUrl ? (
                        <CopyToClipboard
                          text={generateNightbotCommand(
                            cell.row.original.nightbotUrl
                          )}
                          acknowledgment="Command copied!"
                        >
                          <Button
                            iconOnly
                            icon={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                              </svg>
                            }
                            variant="dark"
                          />
                        </CopyToClipboard>
                      ) : (
                        <Button
                          textOnly
                          text={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-warning"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          }
                          variant="warning"
                          onClick={handleNoCommand}
                        />
                      )}
                    </td>
                  );
                if (cell.column.id === "name")
                  return (
                    <td className="text-center py-2" {...cell.getCellProps()}>
                      <div className="px-1 w-36 whitespace-nowrap overflow-x-scroll underline text-info">
                        <Link to={`/${cell.row.original.uniqueid}`}>
                          {cell.render("Cell")}
                        </Link>
                      </div>
                    </td>
                  );
                if (cell.column.id === "datetime")
                  return (
                    <td className="text-center py-2" {...cell.getCellProps()}>
                      <div className="px-1 w-20 whitespace-nowrap overflow-x-scroll">
                        {cell.row.original.status === 0 && (
                          <LiveIndicator
                            indicatorColor="bg-success"
                            className="text-success"
                          />
                        )}
                        {(cell.row.original.status === 2 ||
                          isPast(cell.row.original.datetime)) &&
                          "Ended "}
                        {cell.row.original.status === 1 && fromDate(cell.value)}
                      </div>
                    </td>
                  );
                return (
                  <td className="text-center py-2" {...cell.getCellProps()}>
                    <div className="px-1 w-24 whitespace-nowrap overflow-x-scroll">
                      {cell.render("Cell")}
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

const HowToFindUrlModal = () => {
  return (
    <div className="h-full w-full flex-grow flex flex-col space-y-4 text-whites-light">
      <div className="flex flex-col space-y-3 text-xs ">
        <div className="border-l border-warning rounded-sm flex flex-col space-y-1 text-whites-light font-medium text-xxs px-2 py-0.5 bg-dark-backgroundDark">
          <div className="uppercase">Requirements</div>
          <div className="flex flex-col space-y-2 font-light pl-2">
            <div className="flex space-x-1">
              <div>-</div>
              <div>Discord desktop client</div>
            </div>
            <div className="flex space-x-1">
              <div>-</div>
              <div>
                You are either the owner of the server, or you have the "Manage
                webhooks" permission, Check this{" "}
                <a
                  className="underline text-info"
                  href="https://support.discord.com/hc/en-us/articles/206029707-Setting-Up-Permissions-FAQ"
                  target="_blank"
                >
                  discord support article
                </a>{" "}
                for more info
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 flex flex-col space-y-3">
          <div className="flex items-center">
            <span>1- Open up your discord</span>
          </div>
          <div className="flex items-center">
            <span>2- Head to the server you want to add</span>
          </div>
          <div className="flex items-center">
            <span>3- On the top left corner, click on the server name</span>
          </div>
          <div>
            <img src={Webhooks1} alt="Webhooks-1" />
          </div>
          <div className="flex items-center">
            <span>4- On the left side menu, click on "Integrations"</span>
          </div>
          <div>
            <img src={Webhooks2} alt="Webhooks-1" />
          </div>
          <div className="flex items-center">
            <span>5- On the right side pane, click on "Create Webhooks"</span>
          </div>
          <div>
            <img src={Webhooks3} alt="Webhooks-1" />
          </div>
          <div className="flex items-center">
            <span>
              6- In the new bot form, leave the "name" field, and for the
              "Channels" dropdown-list as is, or fill in any dummy values. Then
              choose the desired channel to get notified.
            </span>
          </div>
          <div>
            <img src={Webhooks4} alt="Webhooks-1" />
          </div>
        </div>
        <div className="flex items-center">
          <span>
            7- At the bottom of the new bot form, click on "Copy Webhook URL".
          </span>
        </div>
        <div>
          <img src={Webhooks5} alt="Webhooks-1" />
        </div>
        <div className="py-4">
          <div className="border-l-2 border-success px-1">
            You are all set now, just paste the copied URL to our website and
            finish adding the channel
          </div>
        </div>
        <div className="py-2 text-xxs">
          <div className="border-l-2 border-dark-backgroundDarker px-1">
            In case discord decided to change their settings and the way you
            achieve this. please visit{" "}
            <a
              className="underline text-info font-medium"
              href="https://support.discord.com/"
              target="_blank"
              rel="noreferrer"
            >
              Discord support
            </a>{" "}
            and you will definitely find your answer
          </div>
        </div>
      </div>
    </div>
  );
};

const HowDiscordWorksModal = () => {
  return (
    <div className="h-full w-full flex-grow flex flex-col space-y-4 pt-2">
      {/* The idea */}
      <PrimaryCard
        title={<span className="text-info text-xs p-0">The idea..</span>}
        nopadding
        variant="none"
      >
        <div className="flex flex-col ">
          <div className="text-xs font-light border-l-2 leading-loose text-whites-light border-blacks-dark rounded-sm px-2 -mt-3">
            Add discord channels to your account then hook any of them to events
            you organize. <br /> Enable notifications for said events. <br />{" "}
            Channels will then get notified on progression, it works good to
            instantly update your participants. It could also be used to update
            your team
            <span className="font-sans px-0.5">/</span>moderators or even your
            viewers... the possibilities are endless.
          </div>
        </div>
      </PrimaryCard>
      {/* Requirements */}
      <div className="border-l border-warning rounded-sm flex flex-col space-y-1 text-whites-light font-medium text-xxs px-2 py-0.5 bg-dark-backgroundDark">
        <div className="uppercase">Requirements</div>
        <div className="flex flex-col space-y-2 font-light pl-2">
          <div className="flex space-x-1">
            <div>-</div>
            <div>Discord desktop client</div>
          </div>
          <div className="flex space-x-1">
            <div>-</div>
            <div>
              You are either the owner of the server, or you have the "Manage
              webhooks" permission, Check this{" "}
              <a
                className="underline text-info"
                href="https://support.discord.com/hc/en-us/articles/206029707-Setting-Up-Permissions-FAQ"
                target="_blank"
              >
                discord support article
              </a>{" "}
              for more info
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowNightbotWorksModal = () => {
  return (
    <div className="h-full w-full flex-grow flex flex-col space-y-4 pt-2">
      {/* The idea */}
      <PrimaryCard
        title={<span className="text-info text-xs p-0">The idea..</span>}
        nopadding
        variant="none"
      >
        <div className="flex flex-col ">
          <div className="text-xs font-light border-l-2 leading-loose text-whites-light border-blacks-dark rounded-sm px-2 -mt-3">
            Effortlessly link up your events with any Twitch channel you{" "}
            <span className="italic font-normal">Moderate</span>. Once. <br />{" "}
            The command will always respond with the
            <span className="text-secondary-light font-medium"> LATEST </span>
            event progression results.
          </div>
          <Hr className="w-4/5 text-whites-dark self-center opacity-10 mt-3" />
          <div className="text-info text-xs pt-4 pb-2 pl-2.5 font-semibold tracking-wide ">
            Two steps only!
          </div>
          <div className="flex flex-col text-xs font-light border-l-2 leading-loose text-whites-light border-blacks-dark rounded-sm px-2 -mb-8">
            Copy the Nightbot setup command. <br />
            Paste it in the chat of your channel. <br />
            <span className="font-semibold uppercase">That's all.</span>
            <Hr className="w-4/5 text-whites-dark self-center opacity-10 my-2" />
            <div className="text-xxs tracking-tight">
              Your viewers can now use the command{" "}
              <span className="bg-dark-backgroundDarker py-0.5 px-1 rounded-sm">
                !standings
              </span>{" "}
              to get the latest scores <br />
            </div>
          </div>
        </div>
      </PrimaryCard>
      {/* Requirements */}
      <div className="border-l border-warning rounded-sm flex flex-col space-y-1 text-whites-light font-medium text-xxs px-2 py-2 bg-dark-backgroundDark">
        <div className="uppercase">Requirements</div>
        <div className="flex flex-col space-y-2 font-light pl-2">
          <div className="flex space-x-1">
            <div>-</div>
            <div>
              Nightbot is added to the specific channel, check{" "}
              <a
                className="text-info underline"
                target="_blank"
                href="https://nightbot.tv/"
              >
                Nightbot
              </a>{" "}
              to learn more
            </div>
          </div>
          <div className="flex space-x-1">
            <div>-</div>
            <div>
              You own <span className="font-sans">/</span> moderate the channel
              you want to hook
            </div>
          </div>
        </div>
      </div>

      <div className="text-xxs font-light text-whites-dark leading-loose">
        Note, we are using the nightbot command name{" "}
        <span className="bg-dark-backgroundDarker py-0.5 px-1 rounded-sm">
          !standings
        </span>{" "}
        if you get an error{" "}
        <span className="italic font-normal">
          "command name already exists"
        </span>{" "}
        you can either do{" "}
        <span className="bg-dark-backgroundDarker py-0.5 px-1 rounded-sm">
          !delcom !standings
        </span>{" "}
        to delete the existing command name <br />{" "}
        <span className="font-medium">OR</span> edit the command we are
        providing from: <br />
        <span className="bg-dark-backgroundDarker py-0.5 px-1 rounded-sm">
          !addcom !standings etc...
        </span>{" "}
        <br />
        to:
        <br />
        <span className="bg-dark-backgroundDarker py-0.5 px-1 rounded-sm">
          !addcom !{"<ANY_OTHER_NAME>"} etc...
        </span>
      </div>
    </div>
  );
};
