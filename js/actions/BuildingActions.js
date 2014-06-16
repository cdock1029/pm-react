var AppDispatcher =  require('../dispatcher/AppDispatcher');
var PMConstants = require('../constants/PMConstants');
var DataTableActions = require('./DataTableActions');

var merge = require('react/lib/merge');

var BuildingActions = merge(DataTableActions.prototype, {
    getTypeName: function() {
        return PMConstants.BUILDINGS;
    }
});

module.exports = BuildingActions;