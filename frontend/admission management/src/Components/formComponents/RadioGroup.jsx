import { useField } from "formik";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const RadioGroup = ({ label, options, helpText, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  const hasValue = field.value && field.value.length > 0;
  const isValid = meta.touched && !meta.error && hasValue;

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {label} {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => (
          <div
            key={option.value}
            className={`relative group cursor-pointer ${
              option.bordered
                ? "border-2 rounded-xl p-4 transition-all duration-200 hover:border-orange-300"
                : "border-2 border-gray-200 rounded-xl p-4 transition-all duration-200 hover:border-orange-300"
            } ${
              field.value === option.value
                ? "border-orange-500 bg-orange-50 shadow-md"
                : hasError
                ? "border-red-300 hover:border-red-400"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              id={`${props.name}-${option.value}`}
              {...field}
              value={option.value}
              checked={field.value === option.value}
              className="sr-only"
            />
            <label
              htmlFor={`${props.name}-${option.value}`}
              className="flex items-center space-x-3 cursor-pointer w-full"
            >
              {/* Custom Radio Button */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                field.value === option.value
                  ? "border-orange-500 bg-orange-500"
                  : hasError
                  ? "border-red-400"
                  : "border-gray-300 group-hover:border-orange-400"
              }`}>
                {field.value === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-sm font-medium transition-colors duration-200 ${
                field.value === option.value
                  ? "text-orange-700"
                  : hasError
                  ? "text-red-700"
                  : "text-gray-700 group-hover:text-gray-900"
              }`}>
                {option.label}
              </span>
            </label>
            
            {/* Selection Indicator */}
            {field.value === option.value && (
              <div className="absolute top-2 right-2">
                <FiCheckCircle className="w-5 h-5 text-orange-500" />
              </div>
            )}
          </div>
        ))}
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

export default RadioGroup;
