import React, { useCallback, useState } from 'react';
import { useField } from 'formik';
import { FiUpload, FiFile, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

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

  return (
    <div className="mb-4">
      <label className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* File Upload Area */}
      <div
        className={`
          file-upload-area relative transition-all duration-200
          ${dragOver ? 'dragover' : ''}
          ${hasError ? 'border-red-300 bg-red-50' : ''}
          ${field.value ? 'border-green-300 bg-green-50' : ''}
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
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {field.value.type?.startsWith('image/') ? (
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiFile className="w-6 h-6 text-blue-600" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiFile className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {field.value.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(field.value.size)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheck className="w-5 h-5 text-green-500" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <FiUpload className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                {accept.includes('image') && 'Images, '}
                {accept.includes('.pdf') && 'PDF files, '}
                up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      {helpText && !hasError && (
        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
      )}

      {/* Error Message */}
      {hasError && (
        <div className="flex items-center space-x-1 mt-1">
          <FiAlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
          <p className="form-error text-xs">{meta.error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
