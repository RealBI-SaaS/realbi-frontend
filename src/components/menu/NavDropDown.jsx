import React, { useState } from "react";
import { DownOutlined, TeamOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { useOrg } from "../../context/OrganizationContext";

const OrganizationDropDown = () => {
  const { userOrgs } = useOrg();
  const [currentOrg, setCurrentOrg] = useState("Select Org");

  // Map userOrgs to dropdown items
  const items = userOrgs.map((org) => ({
    label: org.name, // ✅ Fixed Typo (was 'lable')
    key: org.id,
    icon: <TeamOutlined />,
  }));

  const handleMenuClick = (e) => {
    const selectedOrg = userOrgs.find((org) => org.id === e.key);
    if (selectedOrg) {
      setCurrentOrg(selectedOrg.name);
      message.info(`Selected: ${selectedOrg.name}`);
    }
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <button className="bg-blue-600 p-2 border-l-black">
        <Space>
          {currentOrg}
          <DownOutlined />
        </Space>
      </button>
    </Dropdown>
  );
};

export default OrganizationDropDown;
