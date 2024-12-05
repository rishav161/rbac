import React, { useState, useEffect } from 'react';

const RoleModal = ({ role, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
  });

  const availablePermissions = ['read', 'write', 'delete', 'update'];

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || '',
        permissions: role.permissions || [],
      });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Role name is required!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg transform transition-all">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-t-2xl">
          <h3 className="text-2xl font-bold text-white">
            {role ? 'Edit Role' : 'Add New Role'}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Role Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Permissions:
            </label>
            <div className="space-y-3">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                    className="mr-3 h-5 w-5 text-green-600 focus:ring-green-500"
                  />
                  <label
                    htmlFor={permission}
                    className="text-gray-700 font-medium capitalize"
                  >
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition"
            >
              {role ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
