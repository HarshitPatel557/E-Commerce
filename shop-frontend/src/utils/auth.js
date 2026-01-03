export const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const setToken = (token) => {
  localStorage.setItem("accessToken", token);
  setTimeout(()=>{
    removeToken();
    alert('Session Expired Login again')
  },15*60*1000);
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};
