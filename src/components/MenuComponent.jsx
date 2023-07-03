import React, { useState, useEffect } from 'react';
import {
 MenuFoldOutlined,
 MenuUnfoldOutlined,
 PoweroffOutlined,
 UserOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { BsCalendar2Check } from 'react-icons/bs';
import {  Menu, Drawer } from 'antd';

function MenuComponent({ setSelectedText, theme }) {
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
 const navigate = useNavigate();
 const path = window.location.pathname;

useEffect(() => {
  const startMenuItemName = NAVIGATION_ITEMS.find(x => x.key === path).name;

  setSelectedText(startMenuItemName);

 } );

 const setHeaderDescription = (e) => {
   console.log(e.item.props.name);
   setSelectedText(e.item.props.name);
 }

 const handleMenuClick = (info) => {
   console.log(info);
   if (info.key === "/logout") {
     let result = window.confirm('Do you really want to log out?');
     if (result) {
       localStorage.clear();
       navigate("/login");
     }
   }
 };

 return (
  
   <Menu
   onClick={(info) => handleMenuClick(info)}
   items={NAVIGATION_ITEMS}
   theme={theme}
   mode='inline'
   defaultSelectedKeys={[window.location.pathname]}
   onSelect={e => setHeaderDescription(e)}
 />      
 )
}

export default MenuComponent;