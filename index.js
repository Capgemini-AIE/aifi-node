const aifi = require('./lib/aifi')(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjAsInRva2VuVHlwZSI6IkFJRkkiLCJzaG9wIjoicHVibGljLXNhbmRib3giLCJpYXQiOjE2NDMwNDE1MjV9.dpChGE79zrB9NTzpRmw7M44f6ucrzxKlv2_kfe5slEQ'
);

// aifi.admin.customers
//   .create({
//     email: 'customer@example.com',
//     password: 'test1234',
//   })
//   .then((customer) => console.log(`response ${customer}`, customer))
//   .catch((error) => console.error(`error: ${error}`, error));

aifi.admin.customers
  .retrieve('1')
  .then((customer) => console.log(`response ${customer}`, customer))
  .catch((error) => console.error(`error: ${error}`, error));
