
var AppDispatcher =  require('../dispatcher/AppDispatcher');
var PMConstants = require('../constants/PMConstants');

var TenantActions = {
    sortColumn: function(column) {
        AppDispatcher.handleViewAction({
            actionType: PMConstants.SORT,
            column: column
        });
    },
    paginationTransition: function(pageNumber) {
        AppDispatcher.handleViewAction({
            actionType: PMConstants.TRANSITION,
            pageNumber: pageNumber
        });
    }
};


module.exports = TenantActions;