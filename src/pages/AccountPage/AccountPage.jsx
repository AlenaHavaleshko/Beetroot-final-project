
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

 const fetchItems = async () => {
  setIsLoading(true);
  try {
   const response = await accountAPI.getAccountInfoCall();
   setUserAccountData(response.data);
  } catch (error) {
   notification.error({
    message: (<b>Something went wrong!</b>)
   });
  }

  setIsLoading(false);
 };
 //в UseEffect не може бути стрілочна функція бути асинх функції
 useEffect(() => {
  fetchItems();
 }, []);

 const userData = {
  userName: "Boris Jonsonuk",
  sotialMedia: "Telegram",
  datePicker1: "2015/01",
  email: "example@gmail.com",
  gender: "female",
  phoneNumber: "+380661695564",
 }

 let [form] = Form.useForm();
 form.setFieldsValue(userData);


 const onFinish = (e) => {
  console.log(e);

  // setIsLoading(true);

  // setIsLoading(false);

  console.log(form)
  notification.success({
   message: (<ul>
    <li>User name: {form.getFieldValue('userName')}</li>
    <li>Telegram: {form.getFieldValue('telegram')}</li>
    <li>Email: {form.getFieldValue('email')}</li>
    <li>Password: {form.getFieldValue('password')}</li>
    <li>Phone number: {form.getFieldValue('phoneNumber')}</li>
    <b>Data was saved!</b>
   </ul>)
  });

  form.resetFields();    //reset form
 }

 return (

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
   {/* {
    isLoading
     ? <Spin size="large" />
     : ()
   } */}
   <Form.Item className="genera-margin">
    <Form.Item
     label="User Name"
     name="userName"
     className="account-form-name"
     rules={[{ required: true, message: 'Please input your user name!' }]}
    >
     <Input placeholder="name" />
    </Form.Item>
    <Form.Item
     label="Telegram"
     name="sotialMedia"
     className="account-form-telegram"
    >
     <Input placeholder="telegram" />
    </Form.Item>
   </Form.Item>
   {/* end User name/ Telegram */}

   {/* Birth day / Gender */}
   <Form.Item className="genera-margin">
    <Row gutter={8}>
     <Col span={12}>
      <Form.Item name="datePicker" label="Birth day">
       <DatePicker />
      </Form.Item>
     </Col>
     <Col span={12}>
      <Form.Item label="Gender">
       <Radio.Group name="gender" label="Gender">
        <Radio value="male"> Male </Radio>
        <Radio value="female"> Female </Radio>

       </Radio.Group>
      </Form.Item>
     </Col>
    </Row>
   </Form.Item>

   {/* end Birth day / Gender */}

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
     name="phoneNumber"
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
     className="account-button"
     type="primary"
     htmlType="submit"
    >
     Save changes
    </Button>
   </Form.Item>
  </Form>
 );
}

export default AccountPage;
