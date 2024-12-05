export const initialUsers = [
    { id: 1, username: 'rishav', email: 'rishav@gmail.com', role: 'admin' },
    { id: 2, username: 'bijay', email: 'bijay@gmail.com', role: 'user' },
    { id: 3, username: 'pratik', email: 'pratik@gmail.com', role: 'admin' },
    { id: 4, username: 'jay', email: 'jay@gmail.com', role: 'user' }
  ];
  
  export const initialRoles = [
    { id: 1, name: 'admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'user', permissions: ['read'] }
  ];