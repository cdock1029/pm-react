var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PMConstants = require('../constants/PMConstants');
var merge = require('react/lib/merge');

var MODEL = 'Tenant';
var HEADING = 'Tenants';

var DEFAULT_COUNT_PER_PAGE = 5;

var DEFAULT_STATE = {
    sortColumn: 'id',
    sortDirection: PMConstants.ASCENDING,
    pageNumber: 1,
    count: -1,
    countPerPage: DEFAULT_COUNT_PER_PAGE,
    page: [],
    isLoading: true
};

var pageState = DEFAULT_STATE;

var setIsLoading = function(isLoading) {
    updatePageState({ isLoading: isLoading });
};

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
    console.log("TenantStore: fetchPageData");
    setIsLoading(true);
    cb(); //forcing component update TODO? :/
    var Model = Parse.Object.extend(MODEL);
    var countPromise;
    if (shouldGetCount) {
        countPromise = getCountPromise();
    }

    var start = (pageState.pageNumber - 1) * pageState.countPerPage;

    var query = new Parse.Query(Model);
    query.limit(pageState.countPerPage);
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
        var pageState = { isLoading: false };
        if (count) {
            pageState['count'] = count;
        }
        pageState['page'] = page;
        updatePageState(pageState);
        cb();
    });
};

var createTenant = function(entity, cb) {
    var Tenant = Parse.Object.extend(MODEL);
    var tenant = new Tenant();

    tenant.set('name', entity.name);
    tenant.set('phone', entity.phone);
    tenant.set('email', entity.email);
    tenant.set('balance', parseInt(entity.balance));

    tenant.save(null, {
        success: function (tenant) {
            cb();
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
    addChangeListener: function(eventType, callback) {
        this.on(eventType, callback);
    },
    removeChangeListener: function(eventType, callback) {
        this.removeListener(eventType, callback);
    },
    getTableHeading: function() {
        return HEADING;
    },
    reloadData: function() {
        fetchPageData(true, TenantStore.emitChange.bind(null, PMConstants.CHANGE));
    },
    emitChange: function (eventType) {
        TenantStore.emit(eventType);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case PMConstants.CREATE:
            createTenant(action.entity, TenantStore.emitChange.bind(null, PMConstants.CREATE));
            break;
        case PMConstants.SORT:
            console.log('Dispatch action type SORT');
            setSortColumn(action.column);
            fetchPageData(true, TenantStore.emitChange.bind(null, PMConstants.CHANGE));
            break;
        case PMConstants.TRANSITION:
            console.log('transition between data page');
            setPageNumber(action.pageNumber);
            fetchPageData(false, TenantStore.emitChange.bind(null, PMConstants.CHANGE));
            break;
        default:
            return true;
    }
});

module.exports = TenantStore;