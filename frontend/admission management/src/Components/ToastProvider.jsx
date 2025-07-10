// ToastProvider.js
import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const show = (type, msg) => {
    setMessage({ type, msg });
    setTimeout(() => setMessage(null), 3000);
  };

  const toast = {
    success: (msg) => show("success", msg),
    error: (msg) => show("error", msg),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {message && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.msg}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
