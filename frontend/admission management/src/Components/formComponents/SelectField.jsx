import React from "react";
import { useField } from "formik";
import { FiChevronDown, FiAlertCircle } from "react-icons/fi";

const SelectField = ({
  label,
  helpText,
  placeholder = "Select an option",
  children,
  ...props
}) => {
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
        <select
          className={`form-input appearance-none cursor-pointer ${hasError ? 'error' : ''}`}
          {...field}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {hasError ? (
            <FiAlertCircle className="h-4 w-4 text-red-500" />
          ) : (
            <FiChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
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

export default SelectField;
