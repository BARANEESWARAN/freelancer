import React, { useEffect, useState } from "react";
import "./ClientDashboard.css";
import Header from "../../Header/Header";
import {
  Modal,
  Select,
  Input,
  Button,
  Row,
  Col,
  message,
  Table,
  Form
} from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { BaseUrl } from '../../../url/BaseUrl';
import { DeleteOutlined, EditOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

const ClientDashboard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    phoneNumber: '',
    expertise: '',
    jobDecription: ""
  });
  const [loading, setLoading] = useState(false)

  const fetchDataClient = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/clients`);
      setData(response.data.clients);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchDataClient();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, expertise: value }));
  };

  const showModal = () => {
    form.resetFields();
    setFormData({
      fullName: '',
      email: '',
      experience: '',
      phoneNumber: '',
      expertise: '',
      jobDecription: ""
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (record) => {
    setFormData({
      fullName: record.fullName,
      email: record.email,
      experience: record.experience,
      phoneNumber: record.phoneNumber,
      expertise: record.expertise,
      jobDecription: record.jobDecription
    });
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleView = (record) => {
    setFormData({
      fullName: record.fullName,
      email: record.email,
      experience: record.experience,
      phoneNumber: record.phoneNumber,
      expertise: record.expertise,
      jobDecription: record.jobDecription
    });
    form.setFieldsValue(record);
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: '1',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '2',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: '3',
    },
    {
      title: 'Expertise',
      dataIndex: 'expertise',
      key: '4',
    },
    {
      key: '5',
      title: 'Actions',
      fixed: "right",
      width: 100,
      render: (record) => (
        <div className='action-button'>
          <EyeOutlined
            onClick={() => handleView(record)}
            className='table-icon'
          />
          <EditOutlined
            onClick={() => handleEdit(record)}
            className='table-icon'
          />
          <DeleteOutlined
            // onClick={() => handleDelete(record)}
            className='table-delete-icon'
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true)
    console.log(values, "???,values")
    if (values) {
      try {
        const response = await axios.post(`${BaseUrl}/client/new`, values);
        if (response.data.success === true) {
          setLoading(false)
          fetchDataClient();
          message.success("Thankyou for submitting")
          setIsModalOpen(false)
        }
        console.log(response.data); // Handle response data as needed
      } catch (error) {
        setLoading(false)
        if (error.response) {
          console.error('Server Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else if (error.request) {

          console.error('No response received:', error.request);
        } else {

          console.error('Error:', error.message);
        }
      }
      finally {
        setLoading(false)
      }
    }

  };

  return (
    <>
      <div className="registration-button">
        <Button className="create-button" onClick={showModal}>
          <span style={{ marginRight: "10px" }}>+</span>
          Create Client
        </Button>
      </div>
      <div className="admin-table">
        <Table loading={loading} className="admin-table" dataSource={data} columns={columns} />;
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
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
              value={formData.jobDecription}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='btn'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClientDashboard;
