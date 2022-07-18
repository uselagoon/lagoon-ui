import React, { useState } from "react";
import Link from 'next/link';
import { Menu } from 'semantic-ui-react';

const FactSearchTabs = ({ activeTab, onActiveTabChange }) => {

  const handleActiveTabCallback = (e, { name }) => {
    e.preventDefault();
    onActiveTabChange(name)
  }

  return (
    <Menu pointing secondary>
      <Menu.Item
        name='All projects'
        active={activeTab === 'All projects'}
        onClick={handleActiveTabCallback}
      >
        <h2 className={`project-menu-link projects ${activeTab === 'All projects' && `active`}`}>All Projects</h2>
      </Menu.Item>
      <Menu.Item
        name='Environments'
        active={activeTab === 'Environments'}
        onClick={handleActiveTabCallback}
      >
        <h2 className={`project-menu-link environments ${activeTab === 'Environments' && `active`}`}>Environments</h2>
      </Menu.Item>
    </Menu>
  )
};

export default FactSearchTabs;
