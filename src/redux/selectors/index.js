export const actionLoaderSelector =
  (action) =>
  ({ actionLoaderReducer: { actionLoading = {} } = {} }) =>
    actionLoading[action];
  
export const authSelector = ({ auth: { data = {} } = {} }) => data;

export const isAuthStartedSelector = ({ auth: { isAuthenticationStarted = {} } = {} }) => isAuthenticationStarted;

export const activePlanDetailSelector = ({ profileReducer: { activePlan = {} } = {} }) => activePlan;

export const activePlanSelector = ({ profileReducer: { activePlan = {} } = {} }) => activePlan;

export const userSessionStatsSelector = ({ profileReducer: { sessionStats = {} } = {} }) => sessionStats;

export const userDetailSelector = ({ profileReducer: { userDetail = {} } = {} }) => userDetail;

export const configSelector =  ({ auth: { configs = [] } = {} }) => configs;

export const configFindSelector =  (configKey) => ({ auth: { configs = [] } = {} }) => {
  return configs.find(config => config.key === configKey );
};

export const userSessionsLeft = ({ profileReducer: { sessionStats: {
  bonus: { balance: bonusCount = 0 } = {},
  regular: { balance: regularCount = 0 } = {},
} = {} } = {} }) => {
  return bonusCount + regularCount;
};


export const loginDetailSelector = ({ auth: { data = {} } = {} }) => {
  const loginDetail = { isGuest: false,  login: false };
  if (data.has_signup_completed && data.token) {
    loginDetail.login = true;
  } else {
    loginDetail.isGuest = true;
  }

  return loginDetail;
};
