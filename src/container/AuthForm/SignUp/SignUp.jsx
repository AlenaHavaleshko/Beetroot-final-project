import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';

//api
import accountAPI from '../../../api/apiService';

//assets
import "../../../assets/styles/containers/auth-form-sign-up.scss";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  let [form] = Form.useForm();

  const [disabledSave, setDisabledSave] = useState(true);

  async function loginProcessing(loginData) { // function arrow
    setIsLoading(true);
    try {
      const data = await accountAPI.registeredAPI(loginData);
      navigate("/calendar", { replace: true });
    } catch (error) {
      notification.error({
        message: (<b>You entered the wrong username or password!</b>)
      });
    }

    setIsLoading(false);
  }

  const navigate = useNavigate();

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  }

  const onFinish = (values) => {
    console.log(form)
    console.log(values);
    console.log(form.getFieldValue())
    loginProcessing(values);
  };

  return (
    <div className="signup-page">
      <div className="login-logo">
        <svg className="login-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100px" height="100px"><linearGradient id="IMoH7gpu5un5Dx2vID39Ra" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#9dffce" /><stop offset="1" stopColor="#50d18d" /></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" /><linearGradient id="IMoH7gpu5un5Dx2vID39Rb" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stopColor="#135d36" /><stop offset=".931" stopColor="#125933" /><stop offset="1" stopColor="#11522f" /></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z" /></svg>
        <h1
          className="login-logo-text">
          Task tracker</h1>

        <div className="demo-logo-vertical" />
      </div>
      <Form
        form={form}
        onFieldsChange={() => handleFormChange()}
        name="normal_signup"
        className="login-form"
        layout="vertical"
        onFinish={(v) => onFinish(v)}
      >
        <p className="signup-form-text">Sign up</p>

        <Form.Item
          name="name"
          label="Name"
          type="email"
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="User name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          type="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          placeholder={"Enter your password"}
          type="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Enter password"
          />
        </Form.Item>
        <Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={disabledSave}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          // onClick={() => navigate("/calendar")}
          >
            Sign Up
          </Button>
          Or&nbsp;
          <Link
            to="/login"
            className="login-form-button"
            onClick={() => navigate("/calendar")}
          >
            Log in!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;