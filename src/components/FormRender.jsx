import React, { useState, useEffect } from "react";
import { getFormSchema } from "../utils/formSchemaStorage";
import { validateFormFields } from "../utils/formValidation";
import { getSchema, submitForm } from "../api/apiService";

const FormRenderer = () => {
  const [schema, setSchema] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const savedSchema = getFormSchema();
    if (savedSchema) {
      setSchema(savedSchema);
    }
  }, []);
  useEffect(() => {
    const loadSchema = () => {
      const savedSchema = getFormSchema();
      if (savedSchema) {
        setSchema(savedSchema);
      }
    };
    loadSchema();
    window.addEventListener("schemaUpdated", loadSchema);
    // Cleanup
    return () => {
      window.removeEventListener("schemaUpdated", loadSchema);
    };
  }, []);

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const schemaData = await getSchema();
        setSchema(schemaData);
      } catch (error) {
        console.error("Failed to fetch schema:", error);
      }
    };

    fetchSchema();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFormFields(schema, formData);
    setFormErrors(errors);
    if (errors && Object.keys(errors).length !== 0) {
      return;
    }

    const formattedData = Object.entries(formData).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    try {
      await submitForm(formattedData);
      setSuccessMessage("Form submitted successfully!");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <>
      {schema && (
        <>
          {successMessage && (
            <div className="my-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded">
              {successMessage}
            </div>
          )}
          <div className="p-6 bg-white rounded-lg mt-6">
            <h2 className="text-2xl font-bold mb-4 uppercase text-center w-full">
              {schema?.title}
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              {schema?.fields?.map((field) => (
                <div key={field?.name} className="mb-4">
                  <label className="block font-semibold mb-1">
                    {field?.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>

                  {field?.type === "dropdown" ? (
                    <select
                      required={field.required}
                      onChange={(e) => handleChange(e, field.name)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select</option>
                      {field.options?.map((option, index) => (
                        <option key={index} value={option.trim()}>
                          {option.trim()}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(e, field.name)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  )}

                  {formErrors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex justify-end w-full">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                 {" Submit"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default FormRenderer;
