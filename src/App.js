import React, { useState } from 'react';
import RBACManagement from './components/RBACManagement';
import { initialUsers, initialRoles } from './data/initialData';

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddRole = (newRole) => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
  };

  const handleUpdateRole = (updatedRole) => {
    setRoles(roles.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          RBAC Management System
        </h1>
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <RBACManagement 
            users={users}
            roles={roles}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onAddRole={handleAddRole}
            onUpdateRole={handleUpdateRole}
            onDeleteRole={handleDeleteRole}
          />
        </div>
      </div>
    </div>
  );
}

export default App;