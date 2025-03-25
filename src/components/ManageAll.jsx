import SideMenu from './menu/ManageAllSideMenu';
import { useState } from 'react';
import Account from './Account';
import Organizations from './Organizations';

const menuItems = [
  {
    key: 'sub1',
    label: 'Account',
    component: <Account />,
  },
  {
    key: 'sub2',
    label: 'Organizations',
    component: <Organizations />,
  },
];

function ManageAll() {
    const [selectedMenu, setSelectedMenu] = useState('sub1');

  const selectedComponent = menuItems.find(item => item.key === selectedMenu)?.component;

  return (
    <div className="grid grid-cols-6 h-full min-h-screen">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <div className="border rounded-lg shadow-md col-span-5 overflow-auto">
        <div className="w-full h-full">
          {selectedComponent}
        </div>
      </div>
    </div>
  );
}

export default ManageAll;


