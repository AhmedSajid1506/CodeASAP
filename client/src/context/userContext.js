import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const userInitial = []

  const [user, setUser] = useState(userInitial);

  const getUser = async () => {
    const res = await fetch("http://localhost:6001/api/v1/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      }
    })
    const json = await res.json();    
    setUser(json);
  }

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hooks
const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, UserContext, useUserContext };
