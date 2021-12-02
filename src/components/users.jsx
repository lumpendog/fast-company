import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  const renderTableBody = (maxRowsOnPage) => {
    const usersToRender = users.slice(0, maxRowsOnPage);
    return <>{usersToRender.map((user) => renderTableRow(user))}</>;
  };

  const renderTableRow = (user) => {
    const { _id, name, qualities, profession, completedMeetings, rate } = user;
    const { name: profName } = profession;
    return (
      <tr key={_id}>
        <th scope="row">{name}</th>
        <td>{renderQualities(qualities)}</td>
        <td>{profName}</td>
        <td>{completedMeetings}</td>
        <td>{rate}/5</td>
        <td>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(_id)}
          >
            delete
          </button>
        </td>
      </tr>
    );
  };

  const renderQualities = (qualities) => {
    return (
      <>
        {qualities.map((item) => {
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

  const renderTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>{renderTableBody(users.length)}</tbody>
      </table>
    );
  };

  const renderPhrase = (number) => {
    const variantsPhrases = [
      'человек тусанет',
      'человека тусанут',
      'человек тусанут',
    ];
    let classes = 'badge m-1 bg-';
    classes += number === 0 ? 'danger' : 'primary';
    let phrase;
    if (number === 0) {
      phrase = 'Никто не тусанет';
    } else {
      phrase = `${number} ${declOfNum(number, variantsPhrases)}`;
    }
    return (
      <h2>
        <span className={classes}>{phrase} с тобой сегодня</span>
      </h2>
    );
  };

  //Helper function to find the right phrase for current number
  const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  return (
    <>
      {renderPhrase(users.length)}
      {users.length !== 0 && renderTable()}
    </>
  );
};

export default Users;
