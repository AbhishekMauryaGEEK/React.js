import React from "react";
import "./College.css"; // Separate CSS file for styles

function College({ college }) {
  return (
    <div className="college-card">
      <h4 className="college-name">College: {college.name}</h4>
      <h5 className="college-location">Location: {college.location}</h5>
      <h5 className="college-course">Course: {college.Course}</h5>

      <h6 className="students-heading">Students:</h6>
      <ul className="student-list">
        {college.student.map((stu, idx) => (
          <li key={idx} className="student-name">{stu.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default College;
