import axios from "axios";

const loginUrl = "http://localhost:8080/api/auth/login";

const LoginService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(loginUrl, {
        email,
        password,
      });
      return response.data; // return the data to use it in component
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // rethrow so component can handle it
    }
  },
};

export default LoginService;