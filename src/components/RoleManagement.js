import React, { useState } from 'react';
import RoleModal from './RoleModal';
import { toast } from 'react-toastify';

const RoleManagement = ({ roles, onAddRole, onUpdateRole, onDeleteRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenModal = (role = null) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRole(null);
    setIsModalOpen(false);
  };

  const handleSaveRole = (roleData) => {
    if (!roleData.name.trim()) {
      toast.error('Role name cannot be empty!');
      return;
    }
    if (selectedRole) {
      onUpdateRole({ ...selectedRole, ...roleData });
      toast.success('Role updated successfully!');
    } else {
      onAddRole(roleData);
      toast.success('Role added successfully!');
    }
    handleCloseModal();
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      onDeleteRole(roleId);
      toast.success('Role deleted successfully!');
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add New Role
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search roles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              {['ID', 'Name', 'Permissions', 'Actions'].map((header) => (
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
            {filteredRoles.map((role) => (
              <tr key={role.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{role.id}</td>
                <td className="px-4 py-3">{role.name}</td>
                <td className="px-4 py-3">
                  {role.permissions.join(', ') || 'None'}
                </td>
                <td className="px-4 py-3 flex space-x-2">
  <button
    onClick={() => handleOpenModal(role)}
    className="bg-yellow-500 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
    title="Edit Role"
  >
    Edit
  </button>
  <button
    onClick={() => handleDeleteRole(role.id)}
    className="bg-red-500 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-red-600 transition duration-300"
    title="Delete Role"
  >
    Delete
  </button>
</td>

              </tr>
            ))}
            {filteredRoles.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-4"
                >
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Role Modal */}
      {isModalOpen && (
        <RoleModal
          role={selectedRole}
          onSave={handleSaveRole}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default RoleManagement;
