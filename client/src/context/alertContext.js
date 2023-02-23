import { createContext, useContext, useRef } from "react";
const AlertContext = createContext();

// const API = "";

const AlertProvider = ({ children }) => {
  const alert = useRef(null);
  const alertMsg = useRef(null);
  const alertIcon = useRef(null);
  const showAlert = (msg, type) => {
    alert.current.classList.remove("d-none");
    if (type === "success") {
      alertIcon.current.classList.add("fa-circle-check", "text-success");
      alertIcon.current.classList.remove("fa-circle-xmark", "text-danger");
    } else {
      alertIcon.current.classList.add("fa-circle-xmark", "text-danger");
      alertIcon.current.classList.remove("fa-circle-check", "text-success");
    }
    alertMsg.current.innerHTML = msg;
    setTimeout(() => {
      alert.current.classList.add("d-none");
    }, 2500);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="alert text-center d-none" ref={alert}>
        <p className="mb-0 mx-4">
          <i className="me-2 fa-regular fa-circle-xmark text-danger" ref={alertIcon}></i>
          <span ref={alertMsg}>Alert Msg</span>
        </p>
      </div>
    </AlertContext.Provider>
  );
};

// Custom Hooks
const useAlertContext = () => {
  return useContext(AlertContext);
};

export { AlertProvider, AlertContext, useAlertContext };
