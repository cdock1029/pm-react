var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PMConstants = require('../constants/PMConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';
var MODEL = 'Tenant';

var COUNT_PER_PAGE = 5;

var pageState = {
    sortColumn: 'id',
    sortDirection: PMConstants.ASCENDING,
    pageNumber: 1,
    count: -1,
    page: []
};

var getCountPromise = function() {
    var query = new Parse.Query(Tenant);
    return query.count();
};

var updatePageState = function(updates) {
    pageState = merge(pageState, updates);
};

var setSortColumn = function(column) {
    if (pageState.sortColumn === column) {
        updatePageState({ sortDirection: ! pageState.sortDirection, pageNumber: 1 });
    } else {
        updatePageState({ sortDirection: PMConstants.ASCENDING, pageNumber: 1, sortColumn: column });
    }
};

var fetchPageData = function(shouldGetCount, cb) {
    var Model = Parse.Object.extend(MODEL);
    var countPromise, result;
    if (shouldGetCount) {
        countPromise = getCountPromise();
    }

    var start = (pageState.pageNumber - 1) * COUNT_PER_PAGE;

    var query = new Parse.Query(Model);
    query.limit(COUNT_PER_PAGE);
    query.skip(start);

    if (pageState.sortDirection) {
        query.ascending(pageState.sortColumn);
    } else {
        query.descending(pageState.sortColumn);
    }

    if (shouldGetCount && countPromise) {
        Parse.Promise.when(query.find(), countPromise).then(function(page, count) {

        });
    }
    query.find().then(function(page) {

    });
};


Tenant.Page = Parse.Collection.extend({
    model: Tenant,

    createTenant: function(name, phone, email, balance) {
        this.add(Tenant.create(name, phone, email, balance));
    }


});

var TenantStore = merge(EventEmitter.prototype, {

    getPageState: function() {
        return pageState;
    },
    getDataColumns: function() {
        return ['name', 'phone', 'email', 'balance'];
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case PMConstants.CREATE:
            Tenant.create(payload.name, payload.phone, payload.email, payload.balance);
            break;
        case PMConstants.SORT:
            setSortColumn(payload.column);
            fetchPageData(true, TenantStore.emitChange);
            break;
    }
});

module.exports = TenantStore;