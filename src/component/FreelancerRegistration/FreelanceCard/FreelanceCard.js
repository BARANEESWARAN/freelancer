import React from 'react';
import './FreelanceCard.css';
import { NavLink } from 'react-router-dom';

const FreelanceCard = ({ name, expertise, experience }) => {
  return (
    <div className="job-card-container">
      <article className="job-card">
        <div className="detail">
          <label className="label">Name</label>
          <p className='data'>{name}</p>
        </div>
        <div className="detail">
          <label className="label">Expertise</label>
          <p className='data'>{expertise}</p>
        </div>
        <div className="detail">
          <label className="label">Experience</label>
          <p className='data'>{experience}</p>
        </div>
        <NavLink to={"/freelacer-registration"} className="contact">Contact</NavLink>
      </article>
    </div>
  );
};

export default FreelanceCard;
