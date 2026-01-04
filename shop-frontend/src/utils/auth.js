// Access token
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

// Refresh token
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

// Auth check
export const isAuthenticated = () => {
  return !!getAccessToken();
};

// Logout helper
export const logout = () => {
  removeAccessToken();
  removeRefreshToken();
};
