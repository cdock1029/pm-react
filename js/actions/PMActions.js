
var AppDispatcher =  require('../dispatcher/AppDispatcher');
var PMConstants = require('../constants/PMConstants');

var PMActions = {
    sortColumn: function(column) {
        AppDispatcher.handleViewAction({
            actionType: PMConstants.TENANT_SORT,
            column: column
        });
    }
};


module.exports = PMActions;