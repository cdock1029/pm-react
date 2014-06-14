var AppDispatcher =  require('../dispatcher/AppDispatcher');
var PMConstants = require('../constants/PMConstants');
var merge = require('react/lib/merge');

var DataTableActions = function() {};
DataTableActions.prototype = merge(DataTableActions.prototype, {
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
    },
    changePageCount: function(countPerPage) {
        AppDispatcher.handleViewAction({
            actionType: PMConstants.CHANGE_PAGE_COUNT,
            countPerPage: countPerPage
        });
    }
});

module.exports = DataTableActions;
