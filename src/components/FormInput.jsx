import React from "react";

const FormFieldInput = ({
  fieldLabel,
  setFieldLabel,
  fieldName,
  setFieldName,
  fieldValidation,
  setFieldValidation,
  fieldError,
  setFieldError,
  fieldType,
  setFieldType,
  options,
  setOptions,
  required,
  setRequired,
}) => {
  const fieldTypes = [
    { value: "", label: "Select field type" },
    { value: "text", label: "text" },
    { value: "email", label: "email" },
    { value: "dropdown", label: "dropdown" },
    { value: "radio", label: "radio" },
    { value: "date", label: "date" },
  ];

  return (
    <>
      {/* Field Label */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          {"Field Label"}
        </label>
        <input
          type="text"
          placeholder="Enter field label"
          value={fieldLabel}
          onChange={(e) => setFieldLabel(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Field Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
         {" Field Name"}
        </label>
        <input
          type="text"
          placeholder="Enter field name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      {/* Validation Criteria  */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
         {" Validation Criteria"}
        </label>
        <input
          type="text"
          placeholder="Enter validation criteria"
          value={fieldValidation}
          onChange={(e) => setFieldValidation(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
        {/* Validation Criteria  */}
        <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
         {" Validation Error Message"}
        </label>
        <input
          type="text"
          placeholder="Enter validation error message"
          value={fieldError}
          onChange={(e) => setFieldError(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      {/* Field Type */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
         {" Field Type"}
        </label>
        <select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          {fieldTypes.map((type) => (
            <option
              key={type.value}
              value={type.value}
              disabled={type.value === ""}
            >
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Options */}
      {(fieldType === "dropdown" || fieldType === "radio") && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
           {" Options (comma-separated)"}
          </label>
          <input
            type="text"
            placeholder="Option1,Option2,Option3"
            value={options.join(",")}
            onChange={(e) => setOptions(e.target.value.split(","))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      )}

      {/* Required Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={required}
          onChange={() => setRequired(!required)}
          className="h-4 w-4"
        />
        <label className="text-sm font-semibold text-gray-700 ml-2">
        {"Required"}
        </label>
      </div>
    </>
  );
};

export default FormFieldInput;
