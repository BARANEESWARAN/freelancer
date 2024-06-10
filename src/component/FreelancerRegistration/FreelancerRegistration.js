import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import './FreelancerRegistration.css';
import { MailOutlined, FacebookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function FreelancerRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    phoneNumber: '',
    expertise: '',
    birthDate: '',
  });
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, expertise: value }));
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Perform the submit action here
    if (values) {
      message.success("Thank you for submitting");
      setTimeout(() => {
        navigate("/");
      }, 1000); // 1000 milliseconds = 1 second
    }
  };
  

  return (
    <>
  
    <div className='freelancerpage'>
   
    <section className="container">
      <header className='title'>Freelancer Registration</header>
      <Form onFinish={handleSubmit} className="form" layout="vertical">
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className='submit-btn'>
            Submit
          </Button>
        </Form.Item>
      </Form>
     {/* Additional login options */}
     <div className="line"></div>
        <div className="media-options">
          <Button className="field facebook" type="primary" icon={<FacebookOutlined />}>
            Login with Facebook
          </Button>
          <Button className="field google" type="default" icon={<MailOutlined />}>
            Login with Email
          </Button>
        </div>
       
   
    </section>
       
    </div>

    </>
  );
}

export default FreelancerRegistration;
