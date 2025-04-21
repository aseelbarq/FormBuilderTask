import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { saveFormSchema, getFormSchema } from "../utils/formSchemaStorage";
import FormFieldInput from "../components/FormInput";
import { saveSchemaForm } from "../api/apiService";

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [fieldType, setFieldType] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldValidation, setFieldValidation] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [options, setOptions] = useState([]);
  const [required, setRequired] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  useEffect(() => {
    const existingSchema = getFormSchema();
    if (existingSchema) {
      setFormFields(existingSchema.fields || []);
      setFormTitle(existingSchema.title || "");
    }
  }, []);

  const resetFieldInputs = () => {
    setFieldName("");
    setFieldLabel("");
    setFieldType("");
    setRequired(false);
    setOptions([]);
  };

  const addField = () => {
    const existingSchema = getFormSchema();
    const safeSchema = {
      title: existingSchema?.title || "FORM RENDER", // Fallback title
      fields: Array.isArray(existingSchema?.fields)
        ? existingSchema.fields
        : [],
    };

    const newField = {
      name: fieldName,
      label: fieldLabel,
      type: fieldType,
      validation: fieldValidation,
      error: fieldError,
      required,
      options: fieldType === "dropdown" || fieldType === "radio" ? options : [],
    };
    if (fieldName == "" || fieldLabel == "") {
      return;
    }

    const updatedSchema = {
      ...safeSchema,
      title: formTitle || safeSchema.title,
      fields: [...safeSchema.fields, newField],
    };

    setFormFields(updatedSchema.fields);
    saveFormSchema(updatedSchema);
    resetFieldInputs();
  };

  const deleteField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);

    // Save the updated schema to local storage to save data on storage
    const updatedSchema = {
      title: formTitle,
      fields: updatedFields,
    };

    localStorage.removeItem("formSchema"); 
    localStorage.setItem("formSchema", JSON.stringify(updatedSchema));

    saveFormSchema(updatedSchema); 
  };

  const handleSave = async () => {
    try {
      await saveSchemaForm(formTitle, formFields);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    const reorderedFields = Array.from(formFields);
    const [removed] = reorderedFields.splice(source.index, 1);
    reorderedFields.splice(destination.index, 0, removed);

    setFormFields(reorderedFields);
    saveFormSchema({ title: formTitle, fields: reorderedFields });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-3/4 mx-auto mt-12">
      <form>
        {/* Form Title */}
        <div className="mb-10">
          <h4 className="text-xl font-semibold text-gray-700">
           {"Form Builder Title"}
          </h4>
          <input
            type="text"
            placeholder="Enter form title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            aria-label="Form Title"
          />
        </div>

        <FormFieldInput
          fieldLabel={fieldLabel}
          setFieldLabel={setFieldLabel}
          fieldName={fieldName}
          setFieldName={setFieldName}
          fieldValidation={fieldValidation}
          setFieldValidation={setFieldValidation}
          fieldError={fieldError}
          setFieldError={setFieldError}
          fieldType={fieldType}
          setFieldType={setFieldType}
          options={options}
          setOptions={setOptions}
          required={required}
          setRequired={setRequired}
        />

        {/* Add Field Button */}
        <button
          type="button"
          onClick={addField}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
         {"Add Field"}
        </button>
      </form>

      {/* Form Preview Section */}
      <h3 className="text-xl font-semibold mt-8">{"Form Preview:"}</h3>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable-fields">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mt-4 border border-gray-300 p-4 rounded-lg min-h-[100px]"
            >
              {formFields.length > 0 ? (
                formFields.map((field, index) => (
                  <Draggable
                    key={field.name}
                    draggableId={field.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <h6 className="text-md font-semibold flex space-between justify-between mb-2">
                          <div>
                            {field.label}
                            {field.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteIndex(index);
                              setShowConfirm(true);
                            }}
                          >
                            {" "}
                            <svg
                              class="w-6 h-6 text-red-500 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </h6>
                        <input
                          type={field.type}
                          value={field.name}
                          onChange={(e) => {
                            const updatedFields = [...formFields];
                            updatedFields[index] = {
                              ...updatedFields[index],
                              name: e.target.value,
                            };
                            setFormFields(updatedFields);
                            saveFormSchema({
                              title: formTitle,
                              fields: updatedFields,
                            });
                          }}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="text-gray-500 italic">{"No fields added yet"}</div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Save Form Button */}
      <div className="flex justify-end w-full">
        <button
          type="button"
          onClick={() => {
            handleSave();
          }}
          className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
        >
        {"Save Form"}
        </button>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
             {" Confirm Delete"}
            </h2>
            <p className="text-gray-600 mb-6">
              {"Are you sure you want to delete this field?"}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
               {" Cancel"}
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  deleteField(deleteIndex);
                  setShowConfirm(false);
                }}
              >
                {"Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
