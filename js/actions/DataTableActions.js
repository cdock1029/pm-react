var AppDispatcher =  require('../dispatcher/AppDispatcher');
var PMConstants = require('../constants/PMConstants');

var DataTableActions = {
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
    },
    create: function(entity) {
        AppDispatcher.handleViewAction({
            actionType: PMConstants.CREATE,
            entity: entity
        });
    }
};

module.exports = DataTableActions;
