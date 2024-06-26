import React, { useEffect, useState } from 'react';

import { Form, Input, Button, Select, Row, Col, message , Upload} from 'antd';
import { UploadOutlined,} from '@ant-design/icons';
import './JobPost.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import { BaseUrl } from '../../url/BaseUrl';

const { Option } = Select;

const JobPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState("[]");
  const [formData, setFormData] = useState("")

  const navigate = useNavigate()


  const [form] = Form.useForm()

  console.log(formData,"??,formdata")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, expertise: value }));
  };

  // const handleSubmit = async () => {
  //   try{
  //     const response = await axios.post(`${BaseUrl}/client/new`,{formData})
  //     console.log(response,"response")
  //   }catch (error) {
  //     if (error.response) {
  //       console.error('Server Error:', error.response.data);
  //       console.error('Status Code:', error.response.status);
  //     } else if (error.request) {

  //       console.error('No response received:', error.request);
  //     } else {

  //       console.error('Error:', error.message);
  //     }
  //   }
  // }

  const handleSubmit = async (values) => {
    console.log(values,"???,values")
    if (values) {
      try {
        const response = await axios.post(`${BaseUrl}/client/new`, values);
        if (response.data.success === true) {
          form.resetFields()
          setFormData("")
          message.success("Thankyou for submitting")
          navigate("/find-job")
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

  return (
    <>
      <div>

        <Header />
      </div>
      <div className=''>

        <div className='clientpage'>


          <section className="container">

            <header className='title'>Post Job</header>
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
              <Row gutter={16}>
                <Col span={24}>
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

              {/* <Form.Item
                label="Upload Document"
                name="uploaddocument"
              >
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item> */}

              <Form.Item>
                <Button type="primary" htmlType="submit" className='btn'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </section>

        </div>
      </div>
    </>
  );
};

export default JobPosts;
