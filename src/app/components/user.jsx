import React from 'react';
import Qualities from './qualities';

const User = (props) => {
  const { user, onDelete, onToggleFavourite } = props;
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    isFavourite,
  } = user;
  const { name: profName } = profession;
  return (
    <tr key={_id}>
      <th scope="row">{name}</th>
      <td>
        <Qualities qualitiesArray={qualities} />
      </td>
      <td>{profName}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <button className="btn btn-sm" onClick={() => onToggleFavourite(_id)}>
          {isFavourite ? (
            <i className="bi bi-star-fill"></i>
          ) : (
            <i className="bi bi-star"></i>
          )}
        </button>
      </td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
