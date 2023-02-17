import { createContext, useContext } from "react";
// import axios from "axios";

const AppContext = createContext();

// const API = "";

const AppProvider = ({ children }) => {

  // const getProducts = async (url) => {
  //   const res = await axios.get(url);

  // }

  // useEffect(() => {
  //   getProducts(API);
  // }, [])
  

  return (
    <AppContext.Provider value={{ myName: "CodeASAP" }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
