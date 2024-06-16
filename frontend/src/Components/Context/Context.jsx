import { useState, createContext, useContext, useEffect } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfileData = async () => {
    try {
      const url = 'http://localhost:3000/api/auth/profile';
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <authContext.Provider value={{ userData, loading }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
