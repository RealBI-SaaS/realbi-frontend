import { useOrg } from "../../context/OrganizationContext";
import { useState } from "react";

const HomeOrgMenu = ({ onItemClick }) => {
  const { currentOrg, navigations } = useOrg();
  const [selectedItem, setSelectedItem] = useState("Welcome");
  let items = [
    {
      label: "Welcome", // Fix typo from "lable" to "label"
      key: 1,
      icon: null,
    },
    ...navigations.map((nav) => ({
      label: nav.label, // Ensure this matches the key name in the API response
      key: nav.id, // Use ID as the unique key
      icon: null, // Add icons if needed
    })),
  ];

  // Handle item click and update the selected item state
  const handleClick = (label) => {
    setSelectedItem(label); // Set the clicked item as selected
    onItemClick(label); // Trigger the onItemClick handler passed from the parent
  };
  console.log("Navigations:", navigations);
  console.log("Items:", items);
  return (
    <div className="bg-red-500 home-org-menu w-full h-full grid grid-cols-1 justify-center items-center pt-20">
      {currentOrg && <p>{currentOrg.name}</p>}

      {items &&
        items.map((item) => {
          // Define the style for the selected item
          const isSelected = selectedItem === item.label;

          return (
            <div
              key={item.key}
              onClick={() => handleClick(item.label)} // Trigger click handler
              className={`flex justify-start items-baseline px-3 m-3 cursor-pointer ${
                isSelected ? "bg-blue-500 text-white" : "bg-red-200"
              }`} // Apply different styles for selected item
            >
              <p>{item.label}</p>
              {item.icon}
            </div>
          );
        })}
    </div>
  );
};
export default HomeOrgMenu;
