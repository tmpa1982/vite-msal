export const msalConfig = {
  auth: {
    clientId: "2fdb2d25-4f9a-441e-8283-45843fea8306",
    authority: "https://login.microsoftonline.com/aa76d384-6e66-4f99-acef-1264b8cef053",
    redirectUri: window.location.origin,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile"]
};

export const apiRequest = {
  scopes: ["api://cc71daca-4e96-4575-b8be-107360a7031b/access_as_user"]
};
