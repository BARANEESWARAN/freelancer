import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import './ClientRegistration.css';
import { MailOutlined, FacebookOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../url/BaseUrl';
import { auth, googleProvider, facebookProvider } from '../../firebaseConfig';
import { signInWithPopup } from "firebase/auth";
import initFacebookSdk from '../../facebook';


const { Option } = Select;

function ClientRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    phoneNumber: '',
    expertise: '',
    jobDecription: ""
  });

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, expertise: value }));
  };

  const handleSubmit = async (values) => {
    console.log(values,"???,values")
    if (values) {
      try {
        const response = await axios.post(`${BaseUrl}/client/new`, values);
        if (response.data.success === true) {
          message.success("Thankyou for submitting")
          navigate("/")

        }
        console.log(response.data); // Handle response data as needed
      } catch (error) {
        if (error.response) {
          console.error('Server Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else if (error.request) {

          console.error('No response received:', error.request);
        } else {

          console.error('Error:', error.message);
        }

      }
    }

  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setFormData({ ...formData, fullName: result.user.displayName, email: result.user.email, phoneNumber: result.user.phoneNumber })
        form.setFieldsValue({
          fullName: result.user.displayName,
          email: result.user.email,
          phoneNumber: result.user.phoneNumber
        })
      }
      else {
        setFormData({ fullName: "", email: "" })
      }
      console.log(result.user, "result");
      // console.log(result.user.displayName,"name")
      // console.log(result.user.email,"email")
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result.user, "facebook");
    } catch (error) {
      console.error('Error during Facebook sign-in: ', error);
    }
  };

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    initFacebookSdk().then(() => {
      window.FB.getLoginStatus((response) => {
        statusChangeCallback(response);
      });
    });
  }, []);

  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      fetchUserData(response.authResponse.accessToken);
    } else {
      setUserInfo(null);
      console.log('Not logged in');
    }
  };

  const fetchUserData = (accessToken) => {
    window.FB.api('/me', { fields: 'name,email' }, (userInfo) => {
      setUserInfo(userInfo);
      console.log('User Info:', userInfo);
      // alert(`Hello ${userInfo.name}! Your email is ${userInfo.email}`);
    });
  };

  const handleLogin = () => {
    window.FB.login(
      (response) => {
        statusChangeCallback(response);
      },
      { scope: 'public_profile,email', auth_type: 'reauthenticate' }
    );
  };


  return (
    <div className='clients'>
      <NavLink to={"/"}>
        <Button className='back-btn' icon={<ArrowLeftOutlined />}>
          Back
        </Button>
      </NavLink>
      <div className='clientpages'>


        <section className="containers">

          <header className='title'>Client Registration</header>
          <Form onFinish={handleSubmit} className="form" layout="vertical" form={form}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please enter your full name!' }]}
            >
              <Input
                name="fullName"
                className="custom-input"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email address!' },
                    { type: 'email', message: 'Please enter a valid email address!' },
                  ]}
                >
                  <Input
                    name="email"
                    className="custom-input"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
               <Col span={12}>
               <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Please enter your phone number!' },
                    { pattern: /^\d+$/, message: 'Please enter a valid phone number!' },
                  ]}
                >
                  <Input
                    name="phoneNumber"
                    className="custom-input"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col> 
            </Row>
           
            
             
                <Form.Item
                  label="Expertise"
                  name="expertise"
                  rules={[{ required: true, message: 'Please select your expertise!' }]}
                >
                  <Select
                    className="custom-dropdown"
                    placeholder="Select your expertise"
                    value={formData.expertise}
                    onChange={handleSelectChange}
                  >
                    <Option value="Web Development">Web Development</Option>
                    <Option value="Graphic Design">Graphic Design</Option>
                    <Option value="Digital Marketing">Digital Marketing</Option>
                    <Option value="Content Writing">Content Writing</Option>
                  </Select>
                </Form.Item>
           
            <Form.Item
              label="Job Description"
              name="jobDecription"
            >
              <Input.TextArea
                name="jobDecription"
                style={{ resize: "none", height: "4rem" }}
                placeholder="Enter job description"
                value={formData.jobDescription}
                onChange={handleChange}

              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='btn'>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* Additional login options */}
          <div className="line"></div>
          <div className="media-options">
            <Button className="field facebook" type="primary" icon={<FacebookOutlined />} onClick={handleLogin}>
              Login with Facebook
            </Button>
            <Button className="field google" type="default" icon={<MailOutlined />} onClick={signInWithGoogle}>
              Login with Gmail
            </Button>
          </div>


        </section>

      </div>
    </div>
  );
}

export default ClientRegistration;