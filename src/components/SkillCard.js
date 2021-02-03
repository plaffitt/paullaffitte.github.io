import React from 'react';

const SkillCard = ({ label, value }) => {
  return !value
    ? <span className="badge badge-pill badge-primary">{ label }</span>
    : (
      <div className="progress mb-2">
        <div className="progress-bar" style={{ width: `${value}%` }} role="progressbar" aria-valuenow={ value } aria-valuemin="0" aria-valuemax="100">
          <div>
            <span className="float-left ml-2">{ label }</span>
          </div>
        </div>
      </div>
    );
};

export default SkillCard
