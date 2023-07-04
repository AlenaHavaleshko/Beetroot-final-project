import React, { useState, useEffect } from "react";
import { FcAddImage } from 'react-icons/fc'
import {
  Button,
  Form,
  Input,
  DatePicker,
  Col,
  Row,
  notification,
  Spin
} from "antd";

// api
import generalAPI from "../../api/apiService";

//assets
import "../../assets/styles/pages/account-page.scss";
import moment from 'moment';


const dateFormat = 'YYYY-MM-DD';

function AccountPage() {

  const [userAccountData, setUserAccountData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const getAccountInfomation = async () => {
    setIsLoading(true);
    try {
      const response = await generalAPI.getAccountInfoAPI();
      console.log(response);
      setUserAccountData(response.user);    


      const userData = {
        name: "Boris Jonsonuk",
        telegram: "Telegram",
        email: "example@gmail.com",
        gender: "female",
        phone: "+380661695564",
      }

      form.setFieldsValue(response.user);

    }
    catch (error) { }

    setIsLoading(false);
  };

  
  //в UseEffect не може бути стрілочна функція бути асинх функції
  useEffect(() => {
    getAccountInfomation();
  }, []);


  const saveAccountInformation = async (formValues) => {
    setIsLoading(true);
    try {
      const response = await generalAPI.saveAccountInfoAPI(formValues);
      notification.success({
        message: (<b>Data successfully saved</b>)
      });      
    }
    catch (error) { }

    setIsLoading(false);
  };

  const onFinish = (formValues) => {
    saveAccountInformation(formValues);
  }

  return (
    isLoading
      ?
      <div className="example">
        <Spin size="large" style={{ margin: '0 auto' }} />
      </div>
      :
      <Form
        form={form}
        className="registration-form"
        name="complex-form"
        layout="vertical"
        onFinish={data => onFinish(data)}
      >
        <FcAddImage className="add-photo" />
        <p className="user-data">user</p>

        {/* User name / Telegram  */}

        <Form.Item className="genera-margin">
          <Form.Item
            label="User Name"
            name="name"
            className="account-form-name"
            rules={[{ required: true, message: 'Please input your user name!' }]}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            label="Telegram"
            name="telegram"
            className="account-form-telegram"
          >
            <Input placeholder="telegram" />
          </Form.Item>
        </Form.Item>
       
        <Form.Item className="genera-margin">
          <Form.Item
            label="Email"
            name="email"
            className="account-form-email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            className="account-form-phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input placeholder="phone number" />
          </Form.Item>
        </Form.Item>
        {/* end Email / Phone number */}

        <Form.Item
          label=" "
          colon={false}
        >
          <Button
            className="account-button "
            type="primary"
            htmlType="submit"
          >
            <span className="general-font">
              Save changes
            </span>
          </Button>
        </Form.Item>
      </Form>
  );
}

export default AccountPage;
