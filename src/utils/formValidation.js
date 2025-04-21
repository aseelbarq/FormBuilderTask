export const validateFormFields = (schema, formData) => {
  const errors = {};

  schema?.fields?.forEach((field) => {
    const value = formData[field.name];

    // Required fields
    if (field.required && !value) {
      errors[field.name] = `${field.label} is required`;
    }
    // validation for email
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field.name] = "Please enter a valid email address";
      }
    }
    if (field.type === "number" && value) {
      if (isNaN(value)) {
        errors[field.name] = "Please enter a valid number";
      }
    }
    if (
      (field.type === "dropdown" || field.type === "radio") &&
      field.required &&
      !value
    ) {
      errors[field.name] = "Please select an option";
    }
    if (field.type === "text" && value) {
      const startsWithNumber = /^[0-9]/.test(value);
      if (startsWithNumber) {
        errors[field.name] = "Text cannot start with a number";
      }
    }
  });

  return errors;
};
