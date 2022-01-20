'use strict';

// ResourceNamespace allows you to create nested resources, i.e. `admin.customers`.
function ResourceNamespace(aifi, resources) {
  for (const name in resources) {
    const camelCaseName = name[0].toLowerCase() + name.substring(1);

    const resource = new resources[name](aifi);

    this[camelCaseName] = resource;
  }
}

module.exports = function (namespace, resources) {
  return function (aifi) {
    return new ResourceNamespace(aifi, resources);
  };
};

module.exports.ResourceNamespace = ResourceNamespace;
