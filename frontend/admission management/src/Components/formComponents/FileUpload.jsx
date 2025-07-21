import React, { useCallback, useState } from 'react';
import { useField } from 'formik';
import { FiUpload, FiFile, FiX, FiCheck, FiAlertCircle, FiImage, FiFileText } from 'react-icons/fi';

const FileUpload = ({ 
  label, 
  name, 
  accept = "image/*,.pdf", 
  maxSize = 10 * 1024 * 1024, // 10MB
  helpText,
  required,
  ...props 
}) => {
  const [field, meta, helpers] = useField(name);
  const [dragOver, setDragOver] = useState(false);
  const hasError = meta.touched && meta.error;
  const hasValue = field.value;
  const isValid = meta.touched && !meta.error && hasValue;

  const handleFileSelect = useCallback((files) => {
    const file = files[0];
    if (!file) return;

    // File size validation
    if (file.size > maxSize) {
      helpers.setError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    // File type validation
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return file.type.match(type.replace('*', '.*'));
    });

    if (!isValidType) {
      helpers.setError('Invalid file type');
      return;
    }

    helpers.setValue(file);
    helpers.setTouched(true);
  }, [accept, maxSize, helpers]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    handleFileSelect(files);
  }, [handleFileSelect]);

  const removeFile = useCallback(() => {
    helpers.setValue(null);
    helpers.setTouched(true);
  }, [helpers]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type?.startsWith('image/')) {
      return <FiImage className="w-6 h-6 text-blue-600" />;
    } else if (file.type === 'application/pdf') {
      return <FiFileText className="w-6 h-6 text-red-600" />;
    } else {
      return <FiFile className="w-6 h-6 text-gray-600" />;
    }
  };

  const getFileIconBg = (file) => {
    if (file.type?.startsWith('image/')) {
      return "bg-blue-100";
    } else if (file.type === 'application/pdf') {
      return "bg-red-100";
    } else {
      return "bg-gray-100";
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* File Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer group
          ${dragOver 
            ? 'border-orange-400 bg-orange-50 scale-105' 
            : hasError 
            ? 'border-red-300 bg-red-50' 
            : isValid
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById(name).click()}
      >
        <input
          id={name}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="sr-only"
          {...props}
        />

        {field.value ? (
          // File Selected State
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex-shrink-0 w-12 h-12 ${getFileIconBg(field.value)} rounded-xl flex items-center justify-center`}>
                {getFileIcon(field.value)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {field.value.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(field.value.size)}
                </p>
              </div>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheck className="w-5 h-5 text-green-500" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <FiX className="w-4 h-4" />
                </button>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="text-center">
            <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-200 ${
              dragOver 
                ? 'bg-orange-100 text-orange-600 scale-110' 
                : 'bg-gray-100 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600'
            }`}>
              <FiUpload className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">
                {dragOver ? 'Drop your file here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500">
                {accept.includes('image') && 'Images, '}
                {accept.includes('.pdf') && 'PDF files, '}
                up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </div>
        )}

        {/* Drag Overlay */}
        {dragOver && (
          <div className="absolute inset-0 bg-orange-500/10 rounded-xl border-2 border-orange-400 flex items-center justify-center">
            <div className="text-center">
              <FiUpload className="w-12 h-12 text-orange-600 mx-auto mb-2" />
              <p className="text-orange-700 font-semibold">Drop your file here</p>
            </div>
          </div>
        )}
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

export default FileUpload;
