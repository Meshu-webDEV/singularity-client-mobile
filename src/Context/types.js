// Toast types
export const TOAST_OFF = 'TOAST_OFF';
export const TOAST_SET = 'TOAST_SET';
export const TOAST_DURATION = 'TOAST_DURATION';
export const TOAST_VARIANT = 'TOAST_VARIANT';

// Modal types
export const MODAL_OFF = 'MODAL_OFF';
export const MODAL_SET = 'MODAL_SET';
export const MODAL_RESET_STATE = 'MODAL_RESET_STATE';
export const MODAL_SET_VARIANT = 'MODAL_SET_VARIANT';
export const MODAL_SET_SIZE = 'MODAL_SET_SIZE';
export const MODAL_SET_COMPONENT = 'MODAL_SET_COMPONENT';
export const MODAL_SET_TITLE = 'MODAL_SET_TITLE';
export const MODAL_SET_PRIMARY_ACTION = 'MODAL_SET_PRIMARY_ACTION';
export const MODAL_SET_SECONDARY_ACTION = 'MODAL_SET_SECONDARY_ACTION';

// Sidemenu types
export const SIDEMENU_OFF = 'SIDEMENU_OFF';
export const SIDEMENU_ON = 'SIDEMENU_ON';

// Auth types
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const LOADING = 'LOADING';
export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_GOOGLE_LOADING = 'SET_GOOGLE_LOADING';
export const SET_TWITCH_LOADING = 'SET_TWITCH_LOADING';
export const SET_LOCAL_LOADING = 'SET_LOCAL_LOADING';
export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED';
export const SET_NOT_AUTHORIZED = 'SET_NOT_AUTHORIZED';
export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';

// Dashboard page types
export const SET_RECENT_EVENTS = 'SET_RECENT_EVENTS';

// Event page types
export const SET_EVENT = 'SET_EVENT';
export const SET_LOBBYCODE = 'SET_LOBBYCODE ';
export const SET_HOOKED_DISCORD_CHANNELS = 'SET_HOOKED_DISCORD_CHANNELS ';
export const SET_UPDATING = 'SET_UPDATING ';
export const SET_LOBBYCODE_LOADING = 'SET_LOBBYCODE_LOADING ';
export const SET_DISCORD_CHANNELS_LOADING = 'SET_DISCORD_CHANNELS_LOADING ';
export const SET_SHOULD_UPDATE = 'SET_SHOULD_UPDATE ';

// My Templates page types
export const SET_TEMPLATES_LOADING = 'SET_TEMPLATES_LOADING';
export const SET_TEMPLATES = 'SET_TEMPLATES';
export const SET_TEMPLATE_SHOULD_UPDATE = 'SET_TEMPLATE_SHOULD_UPDATE';
export const RESET_TEMPLATE_STATE = 'RESET_TEMPLATE_STATE';
export const SET_MY_TEMPLATES_SKIP = 'SET_MY_TEMPLATES_SKIP';
export const LOAD_MORE_TEMPLATES = 'LOAD_MORE_TEMPLATES';

// Templates Repository page types
export const SET_TEMPLATES_REPO_LOADING = 'SET_TEMPLATES_REPO_LOADING';
export const SET_TEMPLATES_REPO = 'SET_TEMPLATES_REPO';
export const SET_TEMPLATES_REPO_SHOULD_UPDATE =
  'SET_TEMPLATES_REPO_SHOULD_UPDATE';
export const RESET_TEMPLATES_REPO_STATE = 'RESET_TEMPLATE_STATE';
export const SET_TEMPLATES_REPO_SKIP = 'SET_TEMPLATES_REPO_SKIP';
export const LOAD_MORE_TEMPLATES_REPO = 'LOAD_MORE_TEMPLATES_REPO';

// My events page types
export const SET_MY_EVENTS = 'SET_MY_EVENTS';
export const SET_MY_EVENTS_STATS = 'SET_MY_EVENTS_STATS';
export const SET_MY_EVENTS_FETCH_TYPE = 'SET_MY_EVENTS_FETCH_TYPE';
export const SET_MY_EVENTS_SEARCHED_RESULTS = 'SET_MY_EVENTS_SEARCHED_RESULTS';
export const SET_MY_EVENTS_LOADING = 'SET_MY_EVENTS_LOADING';
export const RESET_MY_EVENTS_STATE = 'RESET_MY_EVENTS_STATE';

// Organization page types
export const SET_ORGANIZATION_LOADING = 'SET_ORGANIZATION_LOADING';
export const SET_ORGANIZATION = 'SET_ORGANIZATION';
export const SET_ORGANIZATION_SHOULD_UPDATE = 'SET_ORGANIZATION_SHOULD_UPDATE';
export const RESET_ORGANIZATION = 'RESET_ORGANIZATION';

// Organization-setup page types
export const SET_ORGANIZATION_SETUP_LOADING = 'SET_ORGANIZATION_SETUP_LOADING';
export const SET_ORGANIZATION_SETUP = 'SET_ORGANIZATION_SETUP';
export const SET_ORGANIZATION_SETUP_SHOULD_UPDATE =
  'SET_ORGANIZATION_SETUP_SHOULD_UPDATE';

// Integrations page types
export const SET_INTEGRATIONS_LOADING = 'SET_INTEGRATIONS_LOADING';
export const SET_INTEGRATIONS_SHOULD_UPDATE = 'SET_INTEGRATIONS_SHOULD_UPDATE';
export const SET_DISCORD_WEBHOOKS = 'SET_DISCORD_WEBHOOKS';
export const SET_NIGHTBOT_EVENTS = 'SET_NIGHTBOT_EVENTS';
export const SET_NIGHTBOT_LOADING = 'SET_NIGHTBOT_LOADING';

// Profile page types
export const SET_MY_PROFILE_LOADING = 'SET_MY_PROFILE_LOADING';
export const SET_MY_PROFILE_PROFILE = 'SET_MY_PROFILE_PROFILE';
export const SET_MY_PROFILE_SHOULD_UPDATE = 'SET_MY_PROFILE_SHOULD_UPDATE';

// Events page types
export const EVENTS_SET_EVENTS = 'EVENTS_SET_EVENTS';
export const SET_EVENTS_LOADING_MORE = 'SET_EVENTS_LOADING_MORE';
export const SET_EVENTS_IS_LOADING = 'SET_EVENTS_IS_LOADING';
export const SET_EVENTS_IS_FILTERED = 'SET_EVENTS_IS_FILTERED';
export const SET_EVENTS_DATE_RANGE = 'SET_EVENTS_DATE_RANGE';
export const SET_EVENT_EVENTS = 'SET_EVENT_EVENTS';
export const EVENTS_LOAD_EVENTS = 'EVENTS_LOAD_EVENTS';
export const RESET_PAGINATION = 'RESET_PAGINATION';
export const SET_EVENTS_SKIP = 'SET_EVENTS_SKIP';

// Events page types
export const MY_EVENTS_SET_EVENTS = 'MY_EVENTS_SET_EVENTS';
export const SET_MY_EVENTS_LOADING_MORE = 'SET_MY_EVENTS_LOADING_MORE';
export const SET_MY_EVENTS_IS_LOADING = 'SET_MY_EVENTS_IS_LOADING';
export const SET_MY_EVENTS_IS_FILTERED = 'SET_MY_EVENTS_IS_FILTERED';
export const SET_MY_EVENTS_DATE_RANGE = 'SET_MY_EVENTS_DATE_RANGE';
export const SET_MY_EVENT_EVENTS = 'SET_MY_EVENT_EVENTS';
export const MY_EVENTS_LOAD_EVENTS = 'MY_EVENTS_LOAD_EVENTS';
export const MY_EVENTS_RESET_PAGINATION = 'MY_EVENTS_RESET_PAGINATION';
export const SET_MY_EVENTS_SKIP = 'SET_MY_EVENTS_SKIP';

// ==== New event types
export const SET_NEWEVENT_INITIAL_INFO = 'SET_NEWEVENT_INITIAL_INFO';
export const SET_NEWEVENT_TEAMS = 'SET_NEWEVENT_TEAMS';
export const SET_NEWEVENT_POINTS = 'SET_NEWEVENT_POINTS';
export const SET_NEWEVENT_PRIZE = 'SET_NEWEVENT_PRIZE';
export const SET_SUBMITTING = 'SET_SUBMITTING';
export const SET_SUCCESSFUL_SUBMIT = 'SET_SUCCESSFUL_SUBMIT';
export const SET_CREATED_EVENT_ID = 'SET_CREATED_EVENT_ID';
export const NEW_EVENT_RESET = 'NEW_EVENT_RESET';

// Backend setters by system
export const SET_GAMES = 'SET_GAMES';

export const SET_LOADING = 'SET_LOADING';

// // Frontend setters by client
// export const SET_STEP_ONE = 'SET_STEP_ONE';
// export const SET_STEP_THREE = 'SET_STEP_THREE';
// export const SET_STEP_FOUR = 'SET_STEP_FOUR';
// export const SET_STEP_FIVE = 'SET_STEP_FIVE';
// export const SET_NAME = 'SET_NAME';
// export const SET_ROUNDS = 'SET_ROUNDS';
// export const SET_DATETIME = 'SET_DATETIME';
// export const SET_TYPE = 'SET_TYPE';
// export const SET_LOBBYCODE = 'SET_LOBBYCODE';
// export const SET_HAS_PRIZEPOOL = 'SET_HAS_PRIZEPOOL';

// Teams types
export const SET_TEAMS = 'SET_TEAMS';