import React, { useEffect, useState } from "react";
import { Card, Input, Button, Row, Col, message, DatePicker, Form, Select } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MailOutlined, FacebookOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from "axios";
import "./CreateEvent.css";
import moment from "moment";
import { auth, googleProvider, facebookProvider } from '../../firebaseConfig';
import { signInWithPopup } from "firebase/auth";
import initFacebookSdk from '../../facebook';

const { Option } = Select;

const CreateEvent = () => {

  const [form] = Form.useForm()
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(id);
  const currentAccessToken = localStorage.getItem("accesstoken");
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    phoneNumber: '',
    expertise: '',
    jobDecription: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, expertise: value }));
  };

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:8000/data", {
        ...formData,
      });

      message.success("Thankyou, data saved successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error adding/updating data:", error);
    } finally {
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

  const handleEdit = () => {
    setDisable(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDateChange = (date, dateString) => {
    console.log(dateString, "??,date")
  }


  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
          <section className="container">

            <header className='title'> Registration</header>
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
                    label="Experience"
                    name="experience"
                    rules={[{ required: true, message: 'Please enter your experience!' }]}
                  >
                    <Input
                      name="experience"
                      className="custom-input"
                      placeholder="Enter your experience"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
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
                <Col span={12}>
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
                </Col>
              </Row>
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
    </>
  );
};

export default CreateEvent;
