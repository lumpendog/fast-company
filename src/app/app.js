import React, { useState } from 'react';
import Users from './components/users';
import api from '../app/api';
import SearchStatus from './components/searchStatus';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  const handleToggleFavourite = (id) => {
    const newUsers = [...users];
    const index = newUsers.findIndex((user) => user._id === id);
    newUsers[index].isFavourite = !newUsers[index].isFavourite;
    setUsers(newUsers);
  };

  return (
    <>
      {<SearchStatus number={users.length} />}
      {users.length !== 0 && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleFavourite={handleToggleFavourite}
        />
      )}
    </>
  );
};

export default App;
