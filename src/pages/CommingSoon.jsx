// src/pages/ComingSoon.jsx
import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = ({ title = "Coming Soon", desc = "This page is under construction." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-6">{desc}</p>
      <span className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md">
        🚀 Coming Soon
      </span>
      <div className="mt-6">
        <Link to="/" className="text-blue-500 underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
