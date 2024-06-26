import React, { useEffect, useState } from 'react';



import { jobDetails } from './data';
import FreelanceCard from '../FreelanceCard/FreelanceCard';
import Header from '../../Header/Header';
import axios from 'axios';
import { BaseUrl } from '../../../url/BaseUrl';

const Freelance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/freelancers`,);
        
        setData(response.data.freelancers);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
}, []); 

  return (
    <>
      <Header/>

   {
    loading?
    (
      <div>Loading...</div>
    )
    :
    (
      <div className="job-posts-container">
      {data.map((job, index) => (
        <FreelanceCard
          key={index} 
          name={job.fullName} 
          expertise={job.expertise} 
          experience={job.experience} 
        />
      ))}
    </div>
    )

   }   
    
    </>
  );
};

export default Freelance;
