import React, { useState } from 'react';

import { Input } from 'antd';

import  './JobPost.css';
import jobsData from './jobsData';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';

const JobPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobsData.filter(job =>
    job.seeking.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header/>
      <div className="jobs-list-container">
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <h2>{filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'}</h2>

        <Input
          className="job-search"
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="jobs">
          {filteredJobs.map((job, index) => (
            <div key={index} className="job">
              <div className='job-header'>
                <h3 className="job-title">{job.name}</h3>
                {/* <span className="expertise">{job.expertise}</span> */}
                <span className="experience">{job.experience}</span>
              </div>
              <div className="details">
                <p><strong>Seeking:</strong> {job.seeking}</p>
                <p>{job.description}</p>
              </div>
              <NavLink to={"/freelacer-registration"} className="details-btn">Apply</NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobPosts;
