import React, { useState , useEffect} from 'react';
import "./AdminDashBoard.css";
import { BiLogOut } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";


import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,

} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CreateEvent from '../CreateEvent/CreateEvent';
import ClientDashboard from '../Dashboard/ClientDashBoard/ClientDashboard';
import FreeLancerDashboard from '../Dashboard/FreelancerDashBoard/FreelancerDashboard';

function AdminDashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState('Client Dashboard');
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const Logout = () => {

    navigate("/")


  };

  const renderComponent = () => {
    switch (activeOption) {

      case 'Client Dashboard':
        return <ClientDashboard/>

      case 'FL Dashboard':
        return <FreeLancerDashboard/>

      case 'Create Event':
        return <CreateEvent />;

      case 'Schedule':
        return '';

      case 'User Details':
        return (
          <div style={{ padding: "3rem 0", width: "95%", margin: "0 auto" }}>
            {/* <UserDetails /> */}
          </div>
        );

      case 'My Profile':
        return '';

      case 'Help & Support':
        return '';
      default:
        return '';
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo-details">
          {
            isOpen ?
              <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                <div className="logo_name">SideMenu</div>
                <i onClick={toggleSidebar} style={{ cursor: "pointer" }}> <MenuFoldOutlined /></i>
              </div>
              :
              <i className={`bx`} id="btn" onClick={toggleSidebar}><MenuUnfoldOutlined /></i>
          }
        </div>
        <ul className="nav-list">
          <li className={activeOption === 'Client Dashboard' ? 'active' : ''}>
            <a onClick={() => handleOptionClick('Client Dashboard')}>
              <i><DashboardOutlined /></i>
              <span className="links_name">Client Dashboard</span>
            </a>
            <span className="tooltip">Client Dashboard</span>
          </li>

          <li className={activeOption === 'FL Dashboard' ? 'active' : ''}>
            <a onClick={() => handleOptionClick('FL Dashboard')}>
              <i><DashboardOutlined /></i>
              <span className="links_name">FL Dashboard</span>
            </a>
            <span className="tooltip">FL Dashboard</span>
          </li>


          {/* <li className={activeOption === 'Create Event' ? 'active' : ''}>
            <a onClick={() => handleOptionClick('Create Event')}>
              <i><PieChartOutlined /></i>
              <span className="links_name">Create Event</span>
            </a>
            <span className="tooltip">Create Event</span>
          </li> */}






          {/* <li className={activeOption === 'Schedule' ? 'active' : ''}>
            <a onClick={() => handleOptionClick('Schedule')}>
              <i><DesktopOutlined /></i>
              <span className="links_name">Schedule</span>
            </a>
            <span className="tooltip">Schedule</span>
          </li>
          <li className={activeOption === 'User Details' ? 'active' : ''}>
            <a onClick={() => handleOptionClick('User Details')}>
              <i><ContainerOutlined /></i>
              <span className="links_name">User Details</span>
            </a>
            <span className="tooltip">User Details</span>
          </li>
          <li className={activeOption === 'My Profile' ? 'active' : ''}>
            <a onClick={() => handleOptionClick('My Profile')}>
              <i><AppstoreOutlined /></i>
              <span className="links_name">My Profile</span>
            </a>
            <span className="tooltip">My Profile</span>
          </li>
          <li className={activeOption === 'Help & Support' ? 'active' : ''}>
            <a onClick={() => handleOptionClick('Help & Support')}>
              <i><MenuUnfoldOutlined /></i>
              <span className="links_name">Help & Support</span>
            </a>
            <span className="tooltip">Help & Support</span>
          </li> */}
          <li className="profile">
            {isOpen ? (
              <a className="logout" onClick={Logout}>
                <i><BiLogOut /></i>
                <span>Logout</span>
              </a>
            ) : (
              <a className="logout" onClick={Logout}>
                <i><BiLogOut /></i>
              </a>
            )}
          </li>
        </ul>

      </div>
      <section className="home-section">

        <section id="content">
          <nav>

            <h4>{activeOption}</h4>
            <form action="#">
              <div class="form-input">
                <input type="search" placeholder="Search..." />
                <button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
              </div>
            </form>
            <input type="checkbox" id="switch-mode" hidden />

            <a href="#" class="notification">
              <IoNotifications />
              <span class="num">8</span>
            </a>
            <a href="#" class="profile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2iMTKL4JKh2Rc0f2RtU8-2QQr-Jj-9TVTA&s" />
            </a>
          </nav>
        </section>

        {renderComponent()}

      </section>
    </>
  );
}

export default AdminDashBoard;
