import axios from "axios";
import { BASE } from "../utils/apipaths";  // Use this if 'axiosInstance.js' is in 'src/utils/' or outside it

const axiosInstance = axios.create({
    baseURL: BASE,  // Use BASE from apipaths.js
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});


// Add a request interceptor

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401){
                window.location.href = "/login";
            } else if (error.response.status === 500){
                console.error("Server error, Please try again")
            }
           
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timed out, Please try again");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

