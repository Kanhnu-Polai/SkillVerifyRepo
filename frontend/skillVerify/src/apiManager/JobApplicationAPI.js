import axios from "axios";

const jobApplications = axios.create(
    {
        baseURL:"http://127.0.0.1:5000/",
        timeout:2000,
        headers:{
        "Content-Type": "application/json"
    }

    }
);



jobApplications.interceptors.response.use(
    res => res,
    err => {
        const message = 
        err?.response?.data?.message || 
        err.message ||
        "Network or Server Error";
        return Promise.reject(new Error(message));
    }
);


export async function getApplications(email){
    const res = await jobApplications.get(`applications/${email}`)
    console.log(res)
    return res.data;
}

export {jobApplications}





