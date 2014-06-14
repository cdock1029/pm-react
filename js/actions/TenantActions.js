var AppDispatcher =  require('../dispatcher/AppDispatcher');
var PMConstants = require('../constants/PMConstants');
var DataTableActions = require('./DataTableActions');

var merge = require('react/lib/merge');

var TenantActions = merge(DataTableActions.prototype, {

});

module.exports = TenantActions;