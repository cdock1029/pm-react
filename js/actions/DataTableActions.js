var AppDispatcher =  require('../dispatcher/AppDispatcher');
var PMConstants = require('../constants/PMConstants');
var merge = require('react/lib/merge');

var DataTableActions = function() {};
DataTableActions.prototype = merge(DataTableActions.prototype, {
    sortColumn: function(column) {
        var type = this.getTypeName();
        AppDispatcher.handleViewAction({
            actionType: PMConstants.SORT + type,
            column: column
        });
    },
    paginationTransition: function(pageNumber) {
        var type = this.getTypeName();
        AppDispatcher.handleViewAction({
            actionType: PMConstants.TRANSITION + type,
            pageNumber: pageNumber
        });
    },
    create: function(entity) {
        var type = this.getTypeName();
        AppDispatcher.handleViewAction({
            actionType: PMConstants.CREATE + type,
            entity: entity
        });
    },
    changePageCount: function(countPerPage) {
        var type = this.getTypeName();
        AppDispatcher.handleViewAction({
            actionType: PMConstants.CHANGE_PAGE_COUNT + type,
            countPerPage: countPerPage
        });
    },
    getTypeName: function() {
        alert('method not implemented');
    }
});

module.exports = DataTableActions;
