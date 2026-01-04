import { getAccessToken, getRefreshToken, setAccessToken, logout,} from "./auth";


const API_BASE = "http://127.0.0.1:8000";

export const apiFetch = async (url, options = {}) => {
  const accessToken = getAccessToken();

  const response = await fetch(API_BASE + url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
  });

  // If access token expired
  if (response.status === 401) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      logout();
      window.location.href = "/login";
      return;
    }

    // Try refreshing token
    const refreshResponse = await fetch(
      `${API_BASE}/api/auth/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      setAccessToken(data.access);

      // Retry original request
      return apiFetch(url, options);
    } else {
      logout();
      window.location.href = "/login";
    }
  }

  return response;
};
