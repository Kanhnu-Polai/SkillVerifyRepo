import axios from "axios";

const signupUrl =  import.meta.env.VITE_SKILLVERIFY_AUTH_SERVICE_URL +"/signup";

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