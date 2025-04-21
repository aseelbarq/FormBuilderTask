import axios from "axios";

const API_HEADERS = {
  "Content-Type": "application/json",
  "X-Master-Key":
    "$2a$10$l7Vo9lW/VWuUaYoIpX4FpemDhEOr41h3JMGUFIKRqXE4AR/PPIZCK",
  "X-Access-Key":
    "$2a$10$57MtRJ1i9Ed9unyvO5SZHeRCge6Tx1BtrMoKNaZKGRVfe0yawRBXW",
};

const BASE_URL = "https://api.jsonbin.io/v3/b";

export const getSchema = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/680698a38a456b79668e59b8`, {
      headers: API_HEADERS,
    });
    return response.data.record;
  } catch (error) {
    console.error("Error fetching schema:", error);
    throw error;
  }
};

export const submitForm = async (formData) => {
  const formattedData = Object.entries(formData).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  try {
    await axios.put(`${BASE_URL}/68069aca8561e97a50048944`, formattedData, {
      headers: API_HEADERS,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

export const saveSchemaForm = async (formTitle, formFields) => {
    const formSchema = {
      title: formTitle,
      fields: formFields,
    };
  
    try {
      await axios.put("https://api.jsonbin.io/v3/b/680698a38a456b79668e59b8", formSchema, {
        headers: API_HEADERS,
      });
    } catch (error) {
      console.error("Error saving form schema:", error);
      throw error;
    }
  };
  
