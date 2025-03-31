import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6">
          Your Journey Starts Here
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-10">
          Connect, collaborate, and create with our powerful platform designed
          to help you achieve your goals.
        </p>

        <Link
          to="/login"
          className="inline-block bg-indigo-600 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;
