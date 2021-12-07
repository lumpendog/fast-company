import React from 'react';
import User from './user';

const Users = (props) => {
  const { users, onDelete, onToggleFavourite } = props;

  const renderTableBody = (maxRowsOnPage) => {
    const usersToRender = users.slice(0, maxRowsOnPage);
    return (
      <>
        {usersToRender.map((user) => (
          <User
            key={user._id}
            user={user}
            onDelete={onDelete}
            onToggleFavourite={onToggleFavourite}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>{renderTableBody(users.length)}</tbody>
      </table>
    </>
  );
};

export default Users;
