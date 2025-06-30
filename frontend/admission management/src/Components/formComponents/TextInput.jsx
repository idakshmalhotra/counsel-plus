import { useField } from "formik";
import { FiAlertCircle } from "react-icons/fi";

const TextInput = ({ label, helpText, icon: Icon, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="form-label"
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        
        <input
          className={`form-input ${Icon ? 'pl-10' : ''} ${hasError ? 'error' : ''}`}
          {...field}
          {...props}
        />
        
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiAlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>
      
      {helpText && !hasError && (
        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
      )}
      
      {hasError && (
        <p className="form-error">{meta.error}</p>
      )}
    </div>
  );
};

export default TextInput;
