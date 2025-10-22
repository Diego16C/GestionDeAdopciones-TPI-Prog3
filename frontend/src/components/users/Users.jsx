import React, { useState, useMemo } from 'react';
import UserSearch from './UserSearch';
import UserItem from './UserItem';

const Users = ({ userList, onUserDeleted }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (value) => setSearch(value);

  const filteredUsers = useMemo(() => {
    if (!userList?.length) return [];
    if (!search) return userList;

    return userList.filter((user) =>
      [user.name, user.surname, user.email].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [userList, search]);

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <div className="w-50 mb-4">
        <UserSearch onSearch={handleSearch} search={search} />
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {!userList?.length ? (
          <p>No hay usuarios disponibles...</p>
        ) : filteredUsers.length ? (
          filteredUsers.map((user) => (
            <UserItem key={user.id} {...user} onUserDeleted={onUserDeleted} />
          ))
        ) : (
          <p>No se encontraron usuarios</p>
        )}
      </div>
    </div>
  );
};

export default Users;
