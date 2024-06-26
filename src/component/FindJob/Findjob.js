import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import './Findjob.css';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import { BaseUrl } from '../../url/BaseUrl';

const FindJob = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState("[]");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/clients`,);
      console.log("first", response.data.clients)
      setData(response.data.clients);
      setFilteredJobs(response.data.clients)
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log("first", filteredJobs)

  useEffect(() => {
    console.log(searchTerm.length, "len")
    if (searchTerm.length === 0) {
      setFilteredJobs(data)
    }
    if (searchTerm.length > 0) {
      const filteredJobs = data.filter(job =>
        job.expertise
          .toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("hii", filteredJobs)
      if (filteredJobs) {
        setFilteredJobs(filteredJobs);
      }



    }
  }, [data, searchTerm]);

  return (
    <>
      <Header />


      {
        loading ?
          (
            <div>Loading...</div>
          )
          :
          (
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
                {(filteredJobs ? filteredJobs : data).map((job, index) => (
                  <div key={index} className="job">
                    <div className='job-header'>
                      <h3 className="job-title">{job.fullName}</h3>
                      {/* <span className="expertise">{job.expertise}</span> */}
                      {/* <span className="experience">{job.experience} years</span> */}
                    </div>
                    <div className="details">
                      <p><strong>Seeking:</strong> {job.expertise}</p>
                      <p>{job.jobDecription}</p>
                    </div>
                    <NavLink to={"/freelacer-registration"} className="details-btn">Apply</NavLink>
                  </div>
                ))}
              </div>
            </div>
          )

      }

    </>
  );
};

export default FindJob;
