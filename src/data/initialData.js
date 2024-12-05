export const initialUsers = [
    { id: 1, username: 'rishav', email: 'rishav@example.com', role: 'admin' },
    { id: 2, username: 'bijay', email: 'bijay@example.com', role: 'user' },
    { id: 3, username: 'pratik', email: 'pratik@example.com', role: 'admin' },
    { id: 4, username: 'jay', email: 'jay@example.com', role: 'user' },
    { id: 5, username: 'msd', email: 'msd@example.com', role: 'admin' }
  ];
  
  export const initialRoles = [
    { id: 1, name: 'admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'user', permissions: ['read'] }
  ];