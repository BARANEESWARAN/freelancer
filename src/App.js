import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import ClientRegistration from './component/ClientRegistration/ClientRegistration';
import FreelancerRegistration from './component/FreelancerRegistration/FreelancerRegistration';


import AboutUs from './component/AboutUs/AboutUs';
import Clients from './component/Clients/Clients';
import ContactUs from './component/ContactUs/ContactUs';
import Freelance from './component/FreelancerRegistration/Freelance/Freelance';
import JobPosts from './component/JobPosts/JobPost';
import AdminDashBoard from './component/AdminDashBoard/AdminDashBoard';
import FindJob from './component/FindJob/Findjob';




function App() {

  return (
   
      <div className="App">
{/*      
       <Header/> */}
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Freelance />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/freelancer" element={<Freelance />} />
            <Route path="/job-posts" element={<JobPosts />} />
            <Route path="/find-job" element={<FindJob/>}/>
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/freelacer-registration" element={<FreelancerRegistration />} />
            <Route path="/client-registration" element={<ClientRegistration />} />
            <Route path='/admindashboard'  element={<AdminDashBoard/>}/>
          </Routes>
          </BrowserRouter>
      
      </div>
    
  );
}

export default App;
