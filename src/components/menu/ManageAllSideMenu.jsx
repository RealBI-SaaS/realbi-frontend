import React from 'react';
import { TeamOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import Organizations from '../Organizations';

const items = [
  {
    key: 'sub1',
    label: 'Account',
    icon: <UserOutlined />,
    // children: [
    //   {
    //     key: 'g1',
    //     label: 'Profile',
    //     type: 'group',
    //     children: [
    //       { key: '1', label: 'Option 1' },
    //       { key: '2', label: 'Option 2' },
    //     ],
    //   },
    //   {
    //     key: 'g2',
    //     label: 'Item 2',
    //     type: 'group',
    //     children: [
    //       { key: '3', label: 'Option 3' },
    //       { key: '4', label: 'Option 4' },
    //     ],
    //   },
    // ],
  },
  {
    key: 'sub2',
    label: 'Organizations',
    icon: <TeamOutlined />,
    // children: [
    //   { key: '5', label: 'Option 5' },
    //   { key: '6', label: 'Option 6' },
    //   {
    //     key: 'sub3',
    //     label: 'Submenu',
    //     children: [
    //       { key: '7', label: 'Option 7' },
    //       { key: '8', label: 'Option 8' },
    //     ],
    //   },
    // ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];
const App = ({ selectedMenu, setSelectedMenu }) => {
  const onClick = e => {

    setSelectedMenu(e.key);
    console.log(selectedMenu);
  };
  const navigate = useNavigate();
  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['sub1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      className='text-black text-lg'
    />
  );
};
export default App;