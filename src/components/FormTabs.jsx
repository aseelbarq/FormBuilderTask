import React, { useState } from "react";
import FormBuilder from "./FormBuilder";
import FormRender from "./FormRender";

const FormTabs = () => {
  const [activeTab, setActiveTab] = useState("builder");
  const [formSchema, setFormSchema] = useState(null);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-3/4 mx-auto mt-12">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm focus:outline-none border-b-2 transition-colors duration-300 ${
            activeTab === "builder"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("builder")}
        >
          {"Builder"}
        </button>
        <button
          className={`ml-4 px-4 py-2 font-medium text-sm focus:outline-none border-b-2 transition-colors duration-300 ${
            activeTab === "render"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("render")}
        >
          {"Render"}
        </button>
      </div>

      {activeTab === "builder" && (
        <FormBuilder onSchemaUpdate={(schema) => setFormSchema(schema)} />
      )}
      {activeTab === "render" && <FormRender formSchema={formSchema} />}
    </div>
  );
};

export default FormTabs;
