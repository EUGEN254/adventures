import { useState } from "react";
import { useEffect } from "react";
import { createContext} from "react";
import axios from 'axios'
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
 
  const backendurl = import.meta.env.VITE_BACKEND_URL;
   const [features, setFeatures] = useState([]); 



   const fetchFeatures = async () => {
      try {
        const { data } = await axios.get(`${backendurl}/api/admin/get-features`, {
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
        fetchFeatures(); 
      }, []);

  const value = {
    backendurl,
    features,
  }
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
