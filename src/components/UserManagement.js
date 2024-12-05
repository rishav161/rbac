import React, { useState } from 'react';
import UserModal from './UserModal';
import { toast } from 'react-toastify';

const UserManagement = ({ users, roles, onAddUser, onUpdateUser, onDeleteUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');

  const handleOpenModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = (userData) => {
    if (!userData.username || !userData.email || !userData.role) {
      toast.error('All fields are required!');
      return;
    }
    if (selectedUser) {
      onUpdateUser({ ...selectedUser, ...userData });
      toast.success('User updated successfully!');
    } else {
      onAddUser(userData);
      toast.success('User added successfully!');
    }
    handleCloseModal();
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDeleteUser(userId);
      toast.success('User deleted successfully!');
    }
  };

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      return a[sortField].localeCompare(b[sortField]);
    });

  return (
    <div className="p-6 bg-gray-100 rounded-lg mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition"
        >
          Add New User
        </button>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort By</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
          <option value="role">Role</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              {['ID', 'Username', 'Email', 'Role', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-gray-600 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3 flex space-x-2">
  <button
    onClick={() => handleOpenModal(user)}
    className="bg-yellow-500 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
    title="Edit User"
  >
    Edit
  </button>
  <button
    onClick={() => handleDeleteUser(user.id)}
    className="bg-red-500 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-red-600 transition duration-300"
    title="Delete User"
  >
    Delete
  </button>
</td>

              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          roles={roles}
          onSave={handleSaveUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserManagement;
