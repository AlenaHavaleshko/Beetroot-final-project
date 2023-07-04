
import React, { useState, useEffect } from 'react';
import { BsCalendar2Check } from 'react-icons/bs';
import { MdNightlight } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Drawer } from 'antd';

// assets
import "../assets/styles/layouts/main-layout.scss";


//pages
import "../pages/AccountPage/AccountPage";

//components
import MenuComponent from "../components/MenuComponent";

//helpers
import { useWindowDimension } from "../helpers/useWindowDimension";


const { Header, Sider, Content } = Layout;

function MainLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const [width] = useWindowDimension();

  // const path = window.location.pathname;
  // console.log(path);

  // const [menuItemName, setMenuItemName] = useState(startMenuItemName);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const setHeaderDescription = (e) => {
  //   console.log(e.item.props.name);
  //   setMenuItemName(e.item.props.name);
  // }

  const getUserName = () => {
    const stringFromLocalstorate = localStorage.getItem("auth");

    if (stringFromLocalstorate) {
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  console.log(windowWidth)

  const [openMenu, setOpenMenu] = useState(false);

  const [selectedText, setSelectedText] = useState('');


  return (
    <Layout className="main-block">
      <Sider trigger={null} collapsible collapsed={collapsed}
      >
        <div className="sider">
          <svg onClick={handleLogoClick} className="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="IMoH7gpu5un5Dx2vID39Ra" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#9dffce" /><stop offset="1" stopColor="#50d18d" /></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" /><linearGradient id="IMoH7gpu5un5Dx2vID39Rb" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stopColor="#135d36" /><stop offset=".931" stopColor="#125933" /><stop offset="1" stopColor="#11522f" /></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z" /></svg>
          <h1
            onClick={handleLogoClick}
            className="logo-tekst">
            Task tracker
          </h1>
        </div>

        {/* Sider menu */}
        <MenuComponent
          theme='dark'
          setSelectedText={setSelectedText}
          className="sider-menu"
          isInline="true">

        </MenuComponent>


        {/* Mobile menu */}
        <Drawer
          className="burger-menu"
          placement='left'
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
          closable={false}
        >
          <div className="sider-drawer">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="IMoH7gpu5un5Dx2vID39Ra" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"/><stop offset="1" stop-color="#50d18d"/></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><linearGradient id="IMoH7gpu5un5Dx2vID39Rb" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"/><stop offset=".931" stop-color="#125933"/><stop offset="1" stop-color="#11522f"/></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"/></svg>
          {/* <svg onClick={handleLogoClick} className="logo-drawer-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="IMoH7gpu5un5Dx2vID39Ra" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#9dffce" /><stop offset="1" stopColor="#50d18d" /></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" /><linearGradient id="IMoH7gpu5un5Dx2vID39Rb" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stopColor="#135d36" /><stop offset=".931" stopColor="#125933" /><stop offset="1" stopColor="#11522f" /></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z" /></svg> */}
          <h1
            onClick={handleLogoClick}
            className="logo-drawer-tekst">
            Task tracker
          </h1>
        </div>
          <MenuComponent
            theme='light'
            setSelectedText={setSelectedText}
            isInline>
          </MenuComponent>
        </Drawer>
      </Sider>

      <Layout>
        <Header

          className="header"
          style={{ padding: 0, background: colorBgContainer }}>
          <div className="mobile-burger-menu">
            <MenuOutlined
              onClick={() => {
                setOpenMenu(true);
              }}
            />
          </div>
          <div className="header-wrapper">
            <h1 className="header-page">{selectedText}</h1>
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
            className="header-burger-batton"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
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