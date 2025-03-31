//import React, { useState } from "react";
import React from "react";
//import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useOrg } from "../context/OrganizationContext";

const HomeAuthenticated = () => {
  const { user } = useUser();
  const { currentOrg } = useOrg();
  //const navigate = useNavigate();
  //const [value, setValue] = useState([50]);

  return (
    <div className="home-container p-8 grid grid-cols-1 items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-4xl font-semibold mb-2">
            Welcome, {user?.first_name || ""}!
          </h2>
          <h3>You're in {currentOrg?.name || "No Organization Selected"}</h3>
        </div>
      </div>
    </div>
  );
};

export default HomeAuthenticated;
