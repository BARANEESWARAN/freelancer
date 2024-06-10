import React from 'react';



import { jobDetails } from './data';
import FreelanceCard from '../FreelanceCard/FreelanceCard';
import Header from '../../Header/Header';

const Freelance = () => {
  return (
    <>
      <Header/>
      <div className="job-posts-container">
        {jobDetails.map((job, index) => (
          <FreelanceCard
            key={index} 
            name={job.name} 
            expertise={job.expertise} 
            experience={job.experience} 
          />
        ))}
      </div>
    </>
  );
};

export default Freelance;
