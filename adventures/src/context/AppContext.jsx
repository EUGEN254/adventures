import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "KES";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [initialized, setInitialized] = useState(false);
  const [features, setFeatures] = useState([]); 
  const [adventures, setAdventures] = useState([]);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/me`, {
        withCredentials: true,
      });
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("fetchCurrentUser error:", error.message);
      setUser(null);
    } finally {
      if (!initialized) {
        setLoading(false);
        setInitialized(true);
      }
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setUser(null);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchFeatures = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-features`, {
        withCredentials: true,
      });
      if (data.success) {
        setFeatures(data.data); 
      } else {
        toast.error("Failed to fetch features");
      }
    } catch (error) {
      console.error("fetchFeatures error:", error.message);
      toast.error("Error fetching features");
    }
  };


  useEffect(() => {
    fetchCurrentUser();
    fetchFeatures(); 
  }, []);

  const value = {
    currencySymbol,
    backendUrl,
    fetchCurrentUser,
    fetchFeatures, 
    features,      
    user,
    logout,
    loading,
    adventures
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
