import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import accountAPI from '../../../api/apiService';

//assets
import "../../../assets/styles/containers/auth-form-log-in.scss";

const LogIn = () => { //function LogIn() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
  }

  const handleLoginClick = e => { //- або так на onClik навігувати при натисканні на кнопку

    const loginData = {
      email: 'alena.havaleshko@gmail.com',
      password: 'Ha050989bAa'
    }

    loginProcessing(loginData);   
  }

  
  const loginProcessing = async(loginData) => { // function arrow
    const data = await accountAPI.loginCall(loginData);
    localStorage.setItem('auth', JSON.stringify(data));
    navigate("/calendar", { replace: true });
  }



  const navigate = useNavigate();


  return (
    <Form
      name="normal_login"
      className="login-form"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onSubmit={handleSubmit}
    >
      <p className="login-form-text">Log In</p>

      <Form.Item
        name="username"
        value={email}
        onChange={e => setEmail(e.target.value)}
        label="Email"
        type="email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        placeholder={"Enter your password"}
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button 
          
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
          onClick={() => handleLoginClick()} >
          Log in
        </Button>
        Or&nbsp;
        <Link 
          to="/signup"         
          className="login-form-button"
          onClick={() => navigate("/calendar")}
          >
          Sign up!
        </Link>
      </Form.Item>
    </Form>
  );
};

export default LogIn;