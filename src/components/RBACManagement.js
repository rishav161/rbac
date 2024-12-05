import React from 'react';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';

const RBACManagement = ({
  users,
  roles,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onAddRole,
  onUpdateRole,
  onDeleteRole,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Role-Based Access Control (RBAC) Management
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* User Management Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">User Management</h2>
          <UserManagement
            users={users}
            roles={roles}
            onAddUser={onAddUser}
            onUpdateUser={onUpdateUser}
            onDeleteUser={onDeleteUser}
          />
        </div>

        {/* Role Management Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Role Management</h2>
          <RoleManagement
            roles={roles}
            onAddRole={onAddRole}
            onUpdateRole={onUpdateRole}
            onDeleteRole={onDeleteRole}
          />
        </div>
      </div>
    </div>
  );
};

export default RBACManagement;
