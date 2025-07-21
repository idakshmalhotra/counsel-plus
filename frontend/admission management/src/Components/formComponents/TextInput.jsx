import { useField } from "formik";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const TextInput = ({ label, helpText, icon: Icon, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  const hasValue = field.value && field.value.length > 0;
  const isValid = meta.touched && !meta.error && hasValue;

  return (
    <div className="mb-6">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label} {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 transition-colors duration-200 ${
              hasError ? 'text-red-500' : isValid ? 'text-green-500' : 'text-gray-400 group-focus-within:text-orange-500'
            }`} />
          </div>
        )}
        
        <input
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
            Icon ? 'pl-12' : ''
          } ${
            hasError 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
              : isValid
              ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
              : 'border-gray-200 focus:border-orange-500 hover:border-gray-300'
          }`}
          {...field}
          {...props}
        />
        
        {/* Success/Error Icons */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        {hasError && (
            <FiAlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
          )}
          {isValid && (
            <FiCheckCircle className="h-5 w-5 text-green-500" />
          )}
          </div>
      </div>
      
      {/* Help Text */}
      {helpText && !hasError && (
        <p className="text-xs text-gray-500 mt-2 flex items-center">
          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
          {helpText}
        </p>
      )}
      
      {/* Error Message */}
      {hasError && (
        <div className="mt-2 flex items-center space-x-2">
          <FiAlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600 font-medium">{meta.error}</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
