import SideMenu from "./menu/ManageAllSideMenu";
import { useState } from "react";
import Account from "./Account";
import Organizations from "./Organizations";
import NavigationManagement from "./org/NavigationsManagement";

const menuItems = [
  {
    key: "sub1",
    label: "Account",
    component: <Account />,
  },
  {
    key: "sub4",
    label: "Organizations",
    component: <Organizations />,
  },
  {
    key: "sub2",
    label: "Organizations",
    component: <Organizations />,
  },
  {
    key: "9",
    label: "Organizations",
    component: <Organizations />,
  },
  {
    key: "10",
    label: "Organizations",
    component: <NavigationManagement />,
  },
];

function ManageAll() {
  const [selectedMenu, setSelectedMenu] = useState("sub1");

  const selectedComponent = menuItems.find(
    (item) => item.key === selectedMenu,
  )?.component;

  return (
    <div className="grid grid-cols-6 h-full min-h-screen mt-10">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <div className="border rounded-lg shadow-md col-span-5 overflow-auto">
        <div className="w-full h-full">{selectedComponent}</div>
      </div>
    </div>
  );
}

export default ManageAll;
