import axiosInstance from "../../axios/axiosInstance";
const get_users_orgs = async (accessToken) => {
  try {
    const response = await axiosInstance.get("/organizations/organization/");
    return response;
  } catch (err) {
    throw err;
    console.error("Error fetching organization data:", err);
  }
};

export default get_users_orgs;
