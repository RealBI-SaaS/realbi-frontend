
import axios from 'axios';
const get_users_orgs = (async (accessToken) => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/organizations/organization/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response;
    } catch (err) {
      throw err
      console.error('Error fetching organization data:', err);
    } 
})

export default get_users_orgs;
