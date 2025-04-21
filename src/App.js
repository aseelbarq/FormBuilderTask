import React from "react";
import FormBuilderPage from "./pages/FormBuilderPage";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header title={"form builder"}/>
      <FormBuilderPage />
    </>
  );
}

export default App;
