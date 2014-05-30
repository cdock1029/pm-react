var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PMConstants = require('../constants/PMConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';
var MODEL = 'Tenant';
var HEADING = 'Tenants';

var COUNT_PER_PAGE = 5;

var DEFAULT_STATE = {
    sortColumn: 'id',
    sortDirection: PMConstants.ASCENDING,
    pageNumber: 1,
    count: -1,
    countPerPage: 5,
    page: []
};

var pageState = DEFAULT_STATE;

var getCountPromise = function() {
    var query = new Parse.Query(MODEL);
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

var setPageNumber = function(pageNumber) {
    updatePageState({ pageNumber: pageNumber });
};

var fetchPageData = function(shouldGetCount, cb) {
    var Model = Parse.Object.extend(MODEL);
    var countPromise;
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
    var promise;
    if (shouldGetCount && countPromise) {
        promise = Parse.Promise.when(query.find(), countPromise);
    } else {
        promise = query.find();
    }
    promise.then(function(page, count) {
        var pageState = {};
        if (count) {
            pageState['count'] = count;
        }
        pageState['page'] = page;
        updatePageState(pageState);
        cb();
    });
};

var createTenant = function(payload, cb) {
    var Tenant = Parse.Object.extend(MODEL);
    var tenant = new Tenant();

    tenant.set('name', payload.name);
    tenant.set('phone', payload.phone);
    tenant.set('email', payload.email);
    tenant.set('balance', payload.balance);

    tenant.save(null, {
        success: function (tenant) {
            //TODO clean this up
            updatePageState(DEFAULT_STATE);
            fetchPageData(true, cb);
        },
        error: function (tenant, error) {
            alert('Failed to save tenant. ' + error.description);
        }
    });
};

var TenantStore = merge(EventEmitter.prototype, {

    getPageState: function() {
        console.log('TenantStore.getPageState');
        return pageState;
    },
    getDataColumns: function() {
        return ['name', 'phone', 'email', 'balance'];
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getTableHeading: function() {
        return HEADING;
    },
    reloadData: function() {
        fetchPageData(true, TenantStore.emitChange);
    },
    emitChange: function () {
        TenantStore.emit(CHANGE_EVENT);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case PMConstants.CREATE:
            createTenant(action, TenantStore.emitChange);
            break;
        case PMConstants.SORT:
            console.log('Dispatch action type SORT');
            setSortColumn(action.column);
            fetchPageData(true, TenantStore.emitChange);
            break;
        case PMConstants.TRANSITION:
            console.log('transition between data page');
            setPageNumber(action.pageNumber);
            fetchPageData(false, TenantStore.emitChange);
            break;
        default:
            return true;
    }
});

module.exports = TenantStore;