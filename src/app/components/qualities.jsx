import React from 'react';

const Qualities = (props) => {
  const { qualitiesArray } = props;
  return (
    <>
      {qualitiesArray.map((item) => {
        const { _id, name, color } = item;
        return (
          <span key={_id} className={`badge bg-${color} m-1`}>
            {name}
          </span>
        );
      })}
    </>
  );
};

export default Qualities;
