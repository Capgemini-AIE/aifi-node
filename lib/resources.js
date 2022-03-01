'use strict';

const resourceNamespace = require('./ResourceNamespace');

module.exports = {
  Admin: resourceNamespace('admin', {
    Auth: require('./resources/Admin/Auth'),
    Config: require('./resources/Admin/Config'),
    Contests: require('./resources/Admin/Contests'),
    Customers: require('./resources/Admin/Customers'),
    Orders: require('./resources/Admin/Orders'),
    Products: require('./resources/Admin/Products'),
    Sessions: require('./resources/Admin/Sessions'),
    Stores: require('./resources/Admin/Stores'),
    Tasks: require('./resources/Admin/Tasks'),
  }),

  Customer: resourceNamespace('customer', {
    Contests: require('./resources/Customer/Contests'),
    Customers: require('./resources/Customer/Customers'),
    EntryCodes: require('./resources/Customer/EntryCodes'),
    Orders: require('./resources/Customer/Orders'),
    PasswordReset: require('./resources/Customer/PasswordReset'),
    Payments: require('./resources/Customer/Payments'),
    Products: require('./resources/Customer/Products'),
    Sessions: require('./resources/Customer/Sessions'),
  }),
};
