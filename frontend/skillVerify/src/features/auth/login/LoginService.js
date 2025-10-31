import axios from "axios";

const loginUrl =import.meta.env.VITE_SKILLVERIFY_AUTH_SERVICE_URL+"/login";

const LoginService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(loginUrl, {
        email,
        password,
      });
      return response.data; 
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    }
  },
};

export default LoginService;