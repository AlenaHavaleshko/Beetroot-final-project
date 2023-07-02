
import React, { useState } from 'react';
import { BsCalendar2Check } from 'react-icons/bs';
import { MdNightlight } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

// assets
import "../assets/styles/layouts/main-layout.scss";

//pages
import "../pages/AccountPage/AccountPage";

const { Header, Sider, Content } = Layout;




function MainLayout({ children }) {

  const NAVIGATION_ITEMS = [{
    label: <Link to="/account">My account</Link>,
    key: "/account",
    icon: <UserOutlined />,
    name: "My account"
  },
  {
    label: <Link to="/calendar">Calendar</Link>,
    key: "/calendar",
    icon: <BsCalendar2Check />,
    name: "Calendar"
  },

  {
    label: <Link>Logout</Link>,
    key: "/logout",
    icon: <PoweroffOutlined />,
    danger: true,
    name: "Logout"
  },
  
];

  const [collapsed, setCollapsed] = useState(false);


  const path = window.location.pathname;
  console.log(path);
  const startMenuItemName = NAVIGATION_ITEMS.find(x => x.key === path).name;

  const [menuItemName, setMenuItemName] = useState(startMenuItemName);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setHeaderDescription = (e) => {
    console.log(e.item.props.name);
    setMenuItemName(e.item.props.name);
  }

  const getUserName = () => {
    const stringFromLocalstorate = localStorage.getItem("auth");

    if(stringFromLocalstorate) {
      const obj = JSON.parse(stringFromLocalstorate);
      
      return obj?.user?.name;
    }

    return '';
  }


  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    {
      navigate("/calendar")
    }
  };

  const handleMenuClick = (info) => { 
    console.log(info);
    if(info.key === "/logout") {
        let result = window.confirm('Do you really want to log out?');
        if (result) {
          localStorage.clear();  
          navigate("/login");
        }
    }
  };

  return (
    <Layout className="main-block">
      <Sider trigger={null} collapsible collapsed={collapsed}  
      >
        <div className="sider">
          <svg onClick={handleLogoClick} className="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="IMoH7gpu5un5Dx2vID39Ra" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#9dffce" /><stop offset="1" stopColor="#50d18d" /></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" /><linearGradient id="IMoH7gpu5un5Dx2vID39Rb" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stopColor="#135d36" /><stop offset=".931" stopColor="#125933" /><stop offset="1" stopColor="#11522f" /></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z" /></svg>
          <h1
            onClick={handleLogoClick}
            className="logo-tekst">
            Task tracker</h1>

          <div className="demo-logo-vertical" />
        </div>
        <Menu
          onClick={(info) => handleMenuClick(info)}
          items={NAVIGATION_ITEMS}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          onSelect={e => setHeaderDescription(e)}
        />
        {/* <Button
          onClick={handleLogoutAndToggleSidebar}
          className="sider-logout"
          style={{ width: isLogoutButtonCollapsed ? '64' : '180',
          position: isLogoutButtonCollapsed ? 'absolute' : 'absolut', // Установите позицию кнопки в зависимости от collapsed
          right: isLogoutButtonCollapsed ? '8' : '33'
         }}
        ><span className="general-font"><PoweroffOutlined /> Logout</span>
          
        </Button> */}
      </Sider>

      <Layout>
        <Header className="header" style={{ padding: 0, background: colorBgContainer }}>
          <div className="header-wrapper">
            <h1 className="header-page">{menuItemName}</h1>
            <div className="header-block">
              <MdNightlight className="header-block__theme" />
              <h2 className="header-block__name">{getUserName()}</h2>
              <FaUserCircle
                className="header-block__icon"
                onClick={() => navigate("/account")}
              />
            </div>
          </div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              position: 'absolute',
              top: '-11px'
            }}
          />

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;