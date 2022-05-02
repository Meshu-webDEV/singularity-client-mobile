import { useContext, useEffect, useState } from "react";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";

// Components
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import Button from "../../Components/actions/Button";
import Tabs from "../../Components/layouts/Tabs";

// Context
import EventsContext from "../../Context/Events/EventsContext";
import AuthContext from "../../Context/Auth/AuthContext";

// Other
import {
  ORG_APPLICATION_STATUS,
  TEMPLATES_LOAD_TYPES,
} from "../../lib/constants";
import currencies from "../../lib/currencies.json";

// Images
import Header from "../../Components/layouts/Header";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import Hr from "../../Components/layouts/Hr";
import { useFormikContext } from "formik";
import TinySquare from "../../Components/layouts/TinySquare";
import FastInput from "../../Components/forms/FastInput";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import ToastContext from "../../Context/Toast/ToastContext";
import { useMemo } from "react";
import TemplatesContext from "../../Context/Templates/TemplatesContext";
import { sortBy } from "lodash";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GridList from "../../Components/layouts/GridList";
import CopyToClipboard from "../../Components/actions/CopyToClipboard";

const _currencies = currencies.map((currency) => {
  return {
    name: currency.name,
    code: currency.code,
    symbol: currency.symbol,
  };
});

const Templates = () => {
  //

  const match = useRouteMatch();

  const { templates, getTemplateByUniqueid } = useContext(TemplatesContext);

  return (
    <Switch>
      <Route exact path={`${match.path}/:id`}>
        <ViewTemplate
          templates={templates}
          deleteTemplate={() => null}
          getTemplate={getTemplateByUniqueid}
        />
      </Route>
      <Route path="/">
        <RootTemplates />
      </Route>
    </Switch>
  );

  // return <RootTemplates />;
};

export default Templates;

const RootTemplates = () => {
  const { setToast } = useContext(ToastContext);
  const {
    templates,
    initialLoadTemplates,
    isLoading,
    loadMoreTemplates,
    searchTemplates,
    pagination,
  } = useContext(TemplatesContext);
  const formikCtx = useFormikContext();

  const [fetch_configs, setFetchConfigs] = useState({
    type: TEMPLATES_LOAD_TYPES.INITIAL,
    filters: {
      term: "",
    },
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errors, setErrors] = useState({
    searchTerm: "",
  });

  // Handlers
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMoreTemplates(fetch_configs);
    setIsLoadingMore(false);
  };

  const handleSearchTermChange = (e) => {
    formikCtx.setFieldValue("searchTerm", e.target.value);
    setErrors((e) => {
      return {
        ...e,
        searchTerm: "",
      };
    });
    setFetchConfigs((load) => {
      return {
        ...load,
        type: !e.target.value
          ? TEMPLATES_LOAD_TYPES.INITIAL
          : TEMPLATES_LOAD_TYPES.SEARCH,
      };
    });
  };

  const handleSubmitSearch = async (e) => {
    if (!formikCtx.values.searchTerm)
      return setErrors((e) => {
        return {
          ...e,
          searchTerm: "Required",
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
    await searchTemplates(_configs);
    formikCtx.setSubmitting(false);
    console.log("Searching.. :");
    console.log(_configs);
  };

  // Renderers
  const renderTemplates = () => {
    if (!templates.length)
      return (
        <span className="text-xxs text-whites-dark font-light italic col-span-full py-16">
          No templates found...
        </span>
      );

    return templates.map((t, i) => <TemplateCard key={i} template={t} />);
  };

  useEffect(() => {
    if (templates.length) return;
    initialLoadTemplates();
  }, []);

  return (
    <MobileBaseLayout
      isExplore
      header={<Header />}
      title="Templates repository"
    >
      <div>
        <div className="flex flex-col space-y-5 items-center">
          {/* Search term - backend */}
          <div className="flex space-x-2.5 justify-start items-center pt-1">
            <form className="w-full flex space-x-2.5 justify-start items-center">
              <div className="flex flex-col space-y-1">
                <FastInput
                  className="items-center"
                  noLabel
                  bg="bg-grays-dark"
                  name="searchTerm"
                  placeholder="Search by template name"
                  size="large"
                  onChange={handleSearchTermChange}
                />
                {errors.searchTerm ? (
                  <div className="text-xxs pl-1 text-primary-dark">
                    {errors.searchTerm}
                  </div>
                ) : null}
              </div>
              <Button
                disabled={formikCtx.isSubmitting}
                onClick={handleSubmitSearch}
                type="submit"
                className="text-xs"
                variant="success"
                text="Search"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
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
            </form>
          </div>
          <Hr className="text-whites-dark w-95 opacity-10 self-center" />
          <div>
            {isLoading ? (
              <div className="text-xxs italic text-whites-dark py-14 font-light">
                <LoadingWithDots
                  flow="row"
                  size="0.65rem"
                  color="primary"
                  label={
                    fetch_configs.type === TEMPLATES_LOAD_TYPES.SEARCH
                      ? "Searching"
                      : "Loading"
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <div className="grid 3xs:grid-cols-2 grid-cols-1 gap-3 text-whites-light">
                  {renderTemplates()}
                </div>
                {/* Load-more / Pagination */}
                <div className="flex flex-col space-y-1 items-center text-xs text-whites-light pt-8">
                  {pagination.hasMore && (
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
                        {pagination.remaining} remaining
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileBaseLayout>
  );
};

const ViewTemplate = ({ getTemplate }) => {
  //

  const { id } = useParams();
  const history = useHistory();

  const [template, setTemplate] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return history.replace("/404");
    const _getTemplate = async () => {
      try {
        setIsLoading(true);
        const template = await getTemplate(id);
        setTemplate(template);
      } catch (error) {
        setTemplate({});
        return history.replace("/templates");
      } finally {
        setIsLoading(false);
      }
    };

    _getTemplate();
  }, [id]);

  return (
    <MobileBaseLayout
      header={<Header />}
      title={
        <span className="capitalize">{isLoading ? "..." : template.name}</span>
      }
      backLabel="Templates"
    >
      {isLoading ? (
        <div className="flex flex-col pt-40 text-whites-dark text-xs">
          <LoadingWithDots
            label="Loading template"
            size="0.7rem"
            color="primary"
          />
        </div>
      ) : (
        <SecondaryCard
          title="Template details"
          primaryAction={
            <Button
              onClick={() =>
                history.push(
                  `/dashboard/new-event/?templateId=${template?.uniqueid}&templateName=${template?.name}`
                )
              }
              className="text-xs text-whites-light"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              }
              text="Use template"
              variant="success"
            />
          }
        >
          <div className="flex flex-col space-y-6 text-whites-light text-xs">
            {/* Share template */}
            <div className="absolute text-3xs text-whites-dark top-3 right-3">
              <CopyToClipboard
                text={`${window.location.origin}/templates/${template.uniqueid}`}
                acknowledgment="Template link copied!"
              >
                <div className="flex p space-x-0.5 items-center text-xxs">
                  <span className="opacity-80 shadow-md w-max flex-grow-0 flex space-x-1 justify-center items-center">
                    <span>Share</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2.5 w-2.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </span>
                  </span>
                </div>
              </CopyToClipboard>
            </div>
            <div className="tracking-wide flex flex-col space-y-4">
              <div className="flex flex-col">
                <div className="text-xxs italic font-light text-whites-dark tracking-tight">
                  Template name
                </div>
                <div className="font-semibold">{template.name}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xxs italic font-light text-whites-dark tracking-tight">
                  Template description
                </div>
                <div
                  className="bg-dark-backgroundDark pb-5 pt-2 px-2.5 rounded-md mt-1"
                  style={{ minHeight: "120px" }}
                >
                  <ReactMarkdown
                    disallowedElements={["img"]}
                    className="markdown mobile text-sm"
                    remarkPlugins={[remarkGfm]}
                  >
                    {template.description}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="flex items-center pr-1.5 space-x-3.5 justify-center text-xs text-whites-light">
              <div className="flex items-center space-x-0.5">
                <TinySquare size="tiny" className="bg-primary-dark" />
                <span className="whitespace-nowrap">
                  Template's event configurations
                </span>{" "}
              </div>
              <Hr className="self-center w-full bg-primary-light text-primary-light opacity-50" />
            </div>
            <div className="flex flex-col space-y-3.5">
              <div className="tracking-wide flex flex-col space-y-6">
                {template.template?.description && (
                  <div className="flex flex-col">
                    <div className="text-xxs italic text-whites-dark tracking-tight">
                      Description
                    </div>
                    <div className="bg-dark-backgroundDark pb-5 pt-2 px-2.5 rounded-md mt-1">
                      <ReactMarkdown
                        disallowedElements={["img"]}
                        className="markdown mobile text-sm"
                        remarkPlugins={[remarkGfm]}
                      >
                        {template.template.description}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
                {template.template?.rounds && (
                  <div className="flex flex-col space-y-1">
                    <div className="text-xxs italic text-whites-dark tracking-tight">
                      Rounds
                    </div>
                    <div className="font-semibold px-4 py-1.5 rounded-md bg-dark-background max-w-min">
                      {template.template.rounds}
                    </div>
                  </div>
                )}
                {template.template?.pointPerKill && (
                  <div className="flex flex-col space-y-1">
                    <div className="text-xxs italic text-whites-dark tracking-tight">
                      Points per kill
                    </div>
                    <div className="font-semibold px-4 py-1.5 rounded-md bg-dark-background max-w-min">
                      {template.template.pointPerKill}
                    </div>
                  </div>
                )}
                {template.template?.pointsDistribution && (
                  <div className="flex flex-col space-y-2">
                    <div className="text-xs italic text-whites-dark tracking-tight">
                      Points distribution
                    </div>
                    <div className="py-3.5 px-2 bg-dark-backgroundDark rounded-md">
                      <GridList
                        items={template.template.pointsDistribution}
                        labeledItems
                        label="Place"
                        isOrdinal
                      />
                    </div>
                  </div>
                )}
                {template.template?.teams && (
                  <div className="flex flex-col space-y-2">
                    <div className="text-xs italic text-whites-dark tracking-tight">
                      Participating teams
                    </div>
                    <div className="py-3.5 px-2 bg-dark-backgroundDark rounded-md">
                      <GridList
                        labeledItems
                        label="Team"
                        items={template.template.teams.map((t) => t.name)}
                      />
                    </div>
                  </div>
                )}
                {template.template?.hasPrizepool && (
                  <div className="flex flex-col space-y-2">
                    <div className="text-xs italic text-whites-dark tracking-tight">
                      Prizepool distribution
                    </div>
                    <div className="py-3.5 px-2 bg-dark-backgroundDark rounded-md">
                      <div className="flex items-center space-x-3 mt-2 mb-4">
                        <span className="whitespace-nowrap overflow-x-scroll text-sm">
                          {template.template.prizepool}
                          {
                            _currencies.find(
                              (currency) =>
                                currency.code ===
                                template.template.prizepoolCurrency
                            ).symbol
                          }{" "}
                          Total prizepool
                        </span>
                        <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
                      </div>
                      <GridList
                        items={template.template.prizepoolDistribution}
                        labeledItems
                        label="Place"
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

const TemplateCard = ({ template }) => {
  //

  const history = useHistory();

  const renderOptionsList = (options) => {
    const sortedOptions = sortBy(Object.entries(options), (o) => o[1]);

    return sortedOptions.reverse().map((o, i) => {
      if (o[1])
        return (
          <div key={i} className="flex space-x-1 items-center">
            <IncludedOptionIcon />
            <div className="font-medium tracking-wide text-3xs capitalize">
              {o[0]}
            </div>
          </div>
        );
      return (
        <div key={i} className="flex space-x-1 items-center">
          <NotIncludedOptionIcon />
          <div className="font-medium tracking-wide text-3xs capitalize opacity-90">
            {o[0]}
          </div>
        </div>
      );
    });
  };

  return (
    <Link
      to={`/templates/${template.uniqueid}`}
      className="relative bg-dark-backgroundDark shadow-md text-whites-light rounded-md w-52 3xs:w-44 p-2.5 3xs:py-2 3xs:px-3 col-span-1 flex flex-col space-y-2.5"
    >
      {/* View */}
      <Link
        to={`/templates/${template.uniqueid}`}
        className="absolute top-1.5 right-1.5 text-3xs text-whites-dark flex space-x-1 justify-center items-center"
      >
        <span>view</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-2.5 w-2.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      </Link>
      {/* Template name */}
      <div className="text-xs font-medium tracking-tight whitespace-nowrap overflow-hidden overflow-ellipsis w-9/12">
        {template.name}
      </div>
      {/* Horizontal line */}
      <Hr className="text-whites-light opacity-20 w-2/5" />
      {/* List of options */}
      <div className="flex flex-col space-y-1.5">
        {renderOptionsList(template.used_options)}
      </div>
      {/* Button */}
      <div className="pl-1 pt-2">
        <Button
          onClick={() =>
            history.push(
              `/dashboard/new-event/?templateId=${template?.uniqueid}&templateName=${template?.name}`
            )
          }
          text="Use"
          variant="light"
          className="text-xs"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
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
      {/* Footer */}
      <div className="flex justify-between items-center space-x-5 pt-4 flex-nowrap">
        {/* Creator */}
        {template.owner?.organization_status ===
        ORG_APPLICATION_STATUS.APPROVED ? (
          <Link
            to={`/organization/${template.owner?.organization?.uniqueid}`}
            style={{ width: "55%" }}
            className="flex space-x-1.5 items-center flex-shrink flex-grow"
          >
            {/* Avatar */}
            <img
              style={{
                width: "18px",
                height: "18px",
              }}
              className="inline object-cover rounded-full"
              src={template.owner?.organization?.avatar}
              alt="Organization logo"
            />
            {/* Name */}
            <div className="text-3xs font-medium tracking-wide overflow-hidden overflow-ellipsis">
              {template.owner?.organization?.name}
            </div>
          </Link>
        ) : (
          <div
            style={{ width: "55%" }}
            className="flex space-x-1.5 items-center flex-shrink flex-grow"
          >
            {/* Avatar */}
            <div
              style={{
                width: "16px",
                height: "16px",
              }}
              className="inline object-cover rounded-full bg-whites-dark opacity-5"
            />
            {/* Name */}
            <div className="text-3xs font-light opacity-80 tracking-wide overflow-hidden overflow-ellipsis italic">
              {template.owner?.displayName}
            </div>
          </div>
        )}

        {/* Used counter */}
        <div className=" text-whites-dark flex space-x-0.5 items-center flex-shrink overflow-ellipsis overflow-hidden max-w-max">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
              clipRule="evenodd"
            />
          </svg>

          <div className="text-3xs font-light italic whitespace-nowrap overflow-ellipsis overflow-hidden max-w-max">
            {template.used}
          </div>
        </div>
      </div>
    </Link>
  );
};

const IncludedOptionIcon = () => {
  return (
    <div className="w-4 h-4 rounded-full flex justify-center items-center bg-grays-dark shadow-md text-whites-light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const NotIncludedOptionIcon = () => {
  return (
    <div className="w-4 h-4 rounded-full flex justify-center items-center bg-grays-dark shadow-md text-primary-light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
