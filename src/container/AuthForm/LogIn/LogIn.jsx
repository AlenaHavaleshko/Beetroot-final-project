import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';

//api
import accountAPI from '../../../api/apiService';

//assets
import "../../../assets/styles/containers/auth-form-log-in.scss";

const LogIn = () => { //function LogIn() {
   const [isLoading, setIsLoading] = useState(false);
  let [form] = Form.useForm();
  // form.setFieldsValue({ email: 'alena.havaleshko@gmail.com', password: 'Ha050989bAa' });
  //form.setFieldsValue({ email: '', password: '' });

  const [disabledSave, setDisabledSave] = useState(true);

  async function loginProcessing(loginData) { // function arrow
    setIsLoading(true);
    try {
      const data = await accountAPI.loginCall(loginData);
      localStorage.setItem('auth', JSON.stringify(data));
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
    // const hasErrors = !form.isFieldsTouched(true) ||
    //     form.getFieldsError().filter(({ errors }) => errors.length)
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
    <Form
      form={form}
      onFieldsChange={() => handleFormChange()} 
      name="normal_login"
      className="login-form"
      layout="vertical"
      onFinish={(v) => onFinish(v)}
    >
      <p className="login-form-text">Log In</p>

      <Form.Item
        name="email"
        label="Email"  
        type="email"
        rules={[{ required: true, type: "email", message: 'Please include an @ in your email !' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
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
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

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
        >
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