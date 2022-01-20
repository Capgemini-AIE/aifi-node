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
};
