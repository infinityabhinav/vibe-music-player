import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [userAuth, setUserAuth] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URI}/user/user-info`,
          { credentials: "include" }
        );

        const data = await res.json();
        console.log(data.message);

        if (res.ok) {
          setUserAuth(data.data);
        } else {
          setUserAuth(null);
        }

      } catch (err) {
        console.log(err);
        setUserAuth(null);
      } finally{
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
