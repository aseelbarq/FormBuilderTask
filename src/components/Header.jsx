import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 w-full">
        <h1 className="text-xl font-bold uppercase  mx-auto w-full text-center">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
