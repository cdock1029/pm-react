var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PMConstants = require('../constants/PMConstants');
var _ = require('underscore');
var merge = require('react/lib/merge');


var MODEL = 'Tenant';
var CHANGE = PMConstants.CHANGE + PMConstants.TENANTS;

var DEFAULT_COUNT_PER_PAGE = 5;

var DEFAULT_STATE = {
    sortColumn: 'id',
    sortDirection: PMConstants.ASCENDING,
    pageNumber: 1,
    count: -1,
    countPerPage: DEFAULT_COUNT_PER_PAGE,
    page: {},
    isLoading: true
};

var pageState = DEFAULT_STATE;
var detailsState = {
    subNav: 'details',
    entity: null,
    leases: null,
    transactions: null
};

var loadLeases = function(id, cb) {
    console.log('in loadLeases');
    if (detailsState.leases) {
        console.log('leases already loaded.');
        cb();
    } else {
        console.log('no leases loaded..');
        var leaseIds = detailsState.entity.attributes.leaseIds;
        if (leaseIds && leaseIds.length) {
            console.log('leaseIds not null');
            var Lease = Parse.Object.extend('Lease');
            var query = new Parse.Query(Lease);
            query.containedIn('objectId', leaseIds);
            query.find({
                success: function(leases) {
                    detailsState = merge(detailsState, { leases: leases});
                    cb();
                },
                error: function(error) {
                    alert('Error getting leases: errorCode: ' + error.code + ', errorMessage: ' + error.message);
                    cb();
                }
            });
        } else {
            console.log('leaseIds null');
            detailsState = merge(detailsState, { leases: [] });
            cb();
        }
    }
};

var updateSubNavState = function(subNavState) {
    detailsState = merge(detailsState, { subNav: subNavState });
};

var setDetailsEntity = function (id) {
    detailsState = merge(detailsState, {entity: pageState.page[id]});
};

var setIsLoading = function(isLoading) {
    pageState = merge(pageState, { isLoading: isLoading });
};

var getCountPromise = function() {
    var query = new Parse.Query(MODEL);
    return query.count();
};

var setCountPerPage = function(countPerPage) {
    pageState = merge(pageState, { countPerPage: countPerPage });
};

var setSortColumn = function(column) {
    if (pageState.sortColumn === column) {
        pageState = merge(pageState, { sortDirection: ! pageState.sortDirection, pageNumber: 1 });
    } else {
        pageState = merge(pageState, { sortDirection: PMConstants.ASCENDING, pageNumber: 1, sortColumn: column });
    }
};

var setPageNumber = function(pageNumber) {
    pageState = merge(pageState, { pageNumber: pageNumber });
};

var fetchPageData = function(shouldGetCount, cb) {
    console.log("TenantStore: fetchPageData");
    setIsLoading(true);
    TenantStore.emitChange(CHANGE); //forcing component update TODO? :/
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
        console.log('fetch promise.then');
        var tempPageState = { isLoading: false };
        if (count) {
            tempPageState['count'] = count;
        }
        var entityMap = {};
        page.map(function(entity) {
            entityMap[entity.id]= entity;
        });
        tempPageState['page'] = entityMap;
        pageState = merge(pageState, tempPageState);
        TenantStore.emitChange(PMConstants.DATA_LOADED + PMConstants.TENANTS);//TODO ?? :S
        cb();
    });
/*
    var q = new Parse.Query('Lease');
    q.get('uCNjxBocRb', {
        success:function(l) {
            var Tenant = Parse.Object.extend('Apartment');
            var tenant = new Tenant();
            tenant.id = 'UacX4puMBn';
            l.set('apartment', tenant);
            l.save(null, {
                success: function(l) {
                    alert('success saving tenant in lease');
                },
                error: function(object, error) {
                    alert('error saving lease');
                }
            });
        },
        error: function(object, error) {
            alert('error getting george');
        }
    });*/

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
        return PMConstants.TENANTS;
    },
    reloadData: function() {
        if (_.isEqual({}, pageState.page)) {
            fetchPageData(true, TenantStore.emitChange.bind(null, CHANGE));
        } else {
            console.log('NOT RELOADING DATA');
            TenantStore.emitChange(PMConstants.DATA_LOADED + PMConstants.TENANTS);//TODO ?? :S
        }
    },
    getSubNavState: function() {
        return detailsState;
    },
    emitChange: function (eventType) {
        TenantStore.emit(eventType);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case PMConstants.CREATE + PMConstants.TENANTS:
            createTenant(action.entity, function() {
                setPageNumber(1);
                fetchPageData(true, TenantStore.emitChange.bind(null, CHANGE));
            });
            break;
        case PMConstants.SORT + PMConstants.TENANTS:
            setSortColumn(action.column);
            fetchPageData(true, TenantStore.emitChange.bind(null, CHANGE));
            break;
        case PMConstants.TRANSITION + PMConstants.TENANTS:
            setPageNumber(action.pageNumber);
            fetchPageData(false, TenantStore.emitChange.bind(null, CHANGE));
            break;
        case PMConstants.CHANGE_PAGE_COUNT + PMConstants.TENANTS:
            setCountPerPage(action.countPerPage);
            fetchPageData(true, TenantStore.emitChange.bind(null, CHANGE));
            break;
        case PMConstants.LOAD_AND_SHOW_DETAILS + PMConstants.TENANTS:
            setDetailsEntity(action.id);
            updateSubNavState('details');
            TenantStore.emitChange(PMConstants.SUB_NAV_CHANGE + PMConstants.TENANTS);
            break;
        case PMConstants.SHOW_DETAILS + PMConstants.TENANTS:
            //setDetailsEntity(action.id);
            updateSubNavState('details');
            TenantStore.emitChange(PMConstants.SUB_NAV_CHANGE + PMConstants.TENANTS);
            break;
        case PMConstants.SHOW_LEASES + PMConstants.TENANTS:
            updateSubNavState('leases');
            loadLeases(action.id, function() {
                console.log('in loadLeases callback');
                TenantStore.emitChange(PMConstants.SUB_NAV_CHANGE + PMConstants.TENANTS);
            });
            break;
        case PMConstants.SHOW_TRANSACTIONS + PMConstants.TENANTS:
            updateSubNavState('transactions');
            TenantStore.emitChange(PMConstants.SUB_NAV_CHANGE + PMConstants.TENANTS);
            break;
        default:
            return true;
    }
    return true;
});

module.exports = TenantStore;