import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

//assets
import "../../../assets/styles/containers/auth-form-log-in.scss";

const LogIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
  }

  const navigate = useNavigate();


  return (
    <Form
      name="normal_signup"
      className="login-form"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onSubmit={handleSubmit}
    >
      <p className="login-form-text">Sign up</p>

      <Form.Item
        {...formItemLayout}
        name="username"
        label="Name"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        type="email"
        rules={[{ required: true, message: 'Please input your name' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="User name" />
      </Form.Item>

      <Form.Item
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        label="Email"
        type="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
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
        onClick={() => navigate("/calendar")}
        >
          Sign up
        </Button>
        Or&nbsp;
        <Link 
          to="/login"         
          className="login-form-button">
          Log in!
        </Link>
      </Form.Item>
    </Form>
  );
};

export default LogIn;