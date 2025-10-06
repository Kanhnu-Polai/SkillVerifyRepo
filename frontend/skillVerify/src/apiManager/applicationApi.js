import axios from "axios";

// Step-1: Build One Axios instance for job microservice
const applicationApi = axios.create({
    baseURL: "http://localhost:8088/api/applications",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Step-2: Response / error interceptor
applicationApi.interceptors.response.use(
    res => res,
    err => {
        const message = 
        err?.response?.data?.message || 
        err.message ||
        "Network or Server Error";
        return Promise.reject(new Error(message));
    }
);

// Step-3: Public Helper function
export async function fetchJobsPerEmail() {
    const res = await applicationApi.get("by-user/pkanhu79@gmail.com");
    return res.data;
}

export { applicationApi };