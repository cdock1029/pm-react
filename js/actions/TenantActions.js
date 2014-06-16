var AppDispatcher =  require('../dispatcher/AppDispatcher');
var PMConstants = require('../constants/PMConstants');
var DataTableActions = require('./DataTableActions');
var merge = require('react/lib/merge');

var TenantActions = merge(DataTableActions.prototype, {
    getTypeName: function() {
        return PMConstants.TENANTS;
    },
    showSubNav: function(type, id) {
        console.log('showSubNav type: ' + type);
        AppDispatcher.handleViewAction({
            actionType: type + PMConstants.TENANTS,
            id: id
        });
    }
});

module.exports = TenantActions;