import axios from "./axios.config";


axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        // --------attempt to get a new access token using the refresh token
        await axios.get("/auth/refreshtoken", { withCredentials: true });

       // --------after getting new access token, retry the original request
        return axios(originalConfig);
      } catch (err) {
        
        // --------if refresh token also fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

