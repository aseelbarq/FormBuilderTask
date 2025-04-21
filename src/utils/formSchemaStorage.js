import axios from 'axios';

export const saveFormSchema = (schema) => {
  localStorage.setItem("formSchema", JSON.stringify(schema));
  window.dispatchEvent(new Event("schemaUpdated")); 
};
export const getFormSchema = () => {
  const schema = localStorage.getItem("formSchema");
  return schema ? JSON.parse(schema) : null;
};

export const saveFormSchemaAPI = async (schema) => {
  try {
    const response = await axios.post('https://webhook.site/9c977985-006c-448b-b970-f4a90bde8de3', schema);
    console.log('Schema saved to API:', response.data);
  } catch (error) {
    console.error('Error saving schema to API:', error);
  }
};
