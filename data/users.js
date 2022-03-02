const bcrypt=require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Alyson',
        email: 'alyson@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Gia',
        email: 'Gia@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

module.exports=users;