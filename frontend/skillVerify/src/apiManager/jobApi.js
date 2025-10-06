import axios from "axios";

// Step-1: Build One Axios instance for job microservice
const jobApi = axios.create({
    baseURL: "http://localhost:8086/api/job",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Step-2: Response / error interceptor
jobApi.interceptors.response.use(
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
export async function fetchJobs() {
    const res = await jobApi.get("/getAllJobs");
    return res.data;
}

export { jobApi };