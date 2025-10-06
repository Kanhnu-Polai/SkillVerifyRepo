import axios from "axios";

const signupUrl = "http://localhost:8080/api/auth/signup";

const SignupService = {
  signup: async (name, email, password, role) => {
    try {
      const response = await axios.post(signupUrl, {
        name,
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } 
  },
};

export default SignupService;