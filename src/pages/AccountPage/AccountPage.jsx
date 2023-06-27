
import React, { useState, useEffect } from "react";
import { FcAddImage } from 'react-icons/fc'
import {
  Button,
  Form,
  Input,
  DatePicker,
  Radio,
  Col,
  Row,
  notification,
  Spin
} from "antd";

// api
import accountAPI from "../../api/apiService";

//assets
import "../../assets/styles/pages/account-page.scss";

function AccountPage() {

  const [userAccountData, setUserAccountData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const getAccountInfomation = async () => {
    setIsLoading(true);
    try {
      const response = await accountAPI.getAccountInfoAPI();
      console.log(response);
      setUserAccountData(response.user);

      


      const userData = {
        name: "Boris Jonsonuk",
        telegram: "Telegram",
        datePicker1: "2023/01",
        email: "example@gmail.com",
        gender: "female",
        phone: "+380661695564",
      }

      form.setFieldsValue(response.user);

      //form.setFieldsValue(userAccountData);
      console.log(response.user);
      console.log(userData);
    }
    catch (error) { }

    setIsLoading(false);
  };

  
  //в UseEffect не може бути стрілочна функція бути асинх функції
  useEffect(() => {
    getAccountInfomation();
  }, []);


  const onFinish = (e) => {
    console.log(e);
    console.log(form)
    notification.success({
      message: (<ul>
        <li>User name: {form.getFieldValue('name')}</li>
        <li>Telegram: {form.getFieldValue('telegram')}</li>
        <li>Email: {form.getFieldValue('email')}</li>
        <li>Password: {form.getFieldValue('password')}</li>
        <li>Phone number: {form.getFieldValue('phone')}</li>
        <b>Data was saved!</b>
      </ul>)
    });

    form.resetFields();    //reset form
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
        onFinish={e => onFinish(e)}
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
        {/* end User name/ Telegram */}

        {/* Birth day  */}
        <Form.Item className="genera-margin">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item className="date-picker" name="datePicker" label="Birth day">
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        {/* end Birth day */}

        {/* Email / Phone number */}
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
