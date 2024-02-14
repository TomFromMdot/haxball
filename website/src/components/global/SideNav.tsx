import React, { useState } from 'react';
import { LineChartOutlined, ShoppingCartOutlined, WechatOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink } from 'react-router-dom';
import ToggleButton from './ToggleButton';

import '../../assets/css/Sider.css';

const { Sider } = Layout;

const items = [
  {
    path: '/ranking/RS/points',
    name: 'REAL SOCCER',
    icon: <LineChartOutlined />,
  },
  {
    path: '/ranking/F_V3/points',
    name: 'FUTSAL 3V3',
    icon: <LineChartOutlined />,
  },
];

const discordLink = 'https://discord.gg/';

const SideNav = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isMenuVisible, setMenuVisibility] = useState(true);

  const toggleMenuVisibility = () => {
    setMenuVisibility(!isMenuVisible);
  };

  return (
    <Sider style={{ position: 'fixed', height: '100vh', left: 0, top: 0 }}>
      {isMenuVisible && (
        <Menu theme="dark" mode="vertical" className="h-screen relative">
          {items.map(item => (
            <Menu.Item key={item.path} icon={item.icon} className="bg-secondary">
              <NavLink to={item.path}>{item.name}</NavLink>
            </Menu.Item>
          ))}

          <div className="absolute bottom-0 w-full">
            <Menu.Item
              key="shop"
              style={{ marginBottom: '15px', background: '#26af26' }}
              className="bg-primary-600 text-white hover:bg-primary-600 font-[600]"
              icon={<ShoppingCartOutlined />}
            >
              <NavLink to="/shop">SHOP</NavLink>
            </Menu.Item>

            <Menu.Item
              key="discord"
              className="text-white font-medium"
              style={{ marginBottom: '15px', background: '#5865F2' }}
              icon={<WechatOutlined />}
            >
              <a href={discordLink} target="_blank" rel="noopener noreferrer">
                DISCORD
              </a>
            </Menu.Item>
          </div>
        </Menu>
      )}
      <ToggleButton onToggle={toggleMenuVisibility} isMenuVisible={isMenuVisible} />
    </Sider>
  );
};
export default SideNav;
