import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheck, FiAlertCircle, FiInfo, FiX, FiAlertTriangle } from 'react-icons/fi';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast = ({ toast, onRemove }) => {
  const icons = {
    success: <FiCheck className="w-5 h-5" />,
    error: <FiAlertCircle className="w-5 h-5" />,
    warning: <FiAlertTriangle className="w-5 h-5" />,
    info: <FiInfo className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  };

  return (
    <div className={`max-w-sm w-full ${colors[toast.type]} border rounded-lg shadow-lg p-4 mb-3 transform transition-all duration-300 ease-in-out`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${iconColors[toast.type]}`}>
          {icons[toast.type]}
        </div>
        <div className="ml-3 flex-1">
          {toast.title && (
            <p className="text-sm font-medium">
              {toast.title}
            </p>
          )}
          <p className="text-sm">
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = { id, ...toast };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, toast.duration || 5000);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback({
    success: (message, title, duration) => addToast({ type: 'success', message, title, duration }),
    error: (message, title, duration) => addToast({ type: 'error', message, title, duration }),
    warning: (message, title, duration) => addToast({ type: 'warning', message, title, duration }),
    info: (message, title, duration) => addToast({ type: 'info', message, title, duration })
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toastItem => (
          <Toast
            key={toastItem.id}
            toast={toastItem}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
