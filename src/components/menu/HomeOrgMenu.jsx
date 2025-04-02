import { useOrg } from "../../context/OrganizationContext";
import { RightOutlined } from "@ant-design/icons";
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
    <div className="bg-gray-500 home-org-menu w-full h-full grid grid-cols-1 gap-0 p-0 m-0 justify-center items-start border pt-20">
      <div className="">
        {currentOrg && (
          <p className="border m-3 p-3 text-3xl text-white justify-center pl-5">
            {currentOrg.name}
          </p>
        )}
        <div className=" ">
          <p className="text-md text-white justify-center px-3">Navigations</p>
          {items &&
            items.map((item) => {
              // Define the style for the selected item
              const isSelected = selectedItem === item.label;

              return (
                <div
                  key={item.key}
                  onClick={() => handleClick(item.label)} // Trigger click handler
                  className={`flex justify-start  content-center px-3 m-3 cursor-pointer border rounded-sm hover:bg-gray-400 ${
                    isSelected
                      ? "bg-gray-200 text-black text-lg"
                      : "bg-gray-100 text-black text-md"
                  }`} // Apply different styles for selected item
                >
                  <p className=" text-md h-full justify-center">{item.label}</p>
                  {item.icon}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default HomeOrgMenu;
