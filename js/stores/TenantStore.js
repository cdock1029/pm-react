var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PMConstants = require('../constants/PMConstants');
var merge = require('react/lib/merge');

var pageState = {
    pageNumber: 1,
    sortColumn: 'id',
    sortDirection: PMConstants.ASCENDING
};

var getCount = function() {
    var query = new Parse.Query(Tenant);
    return query.count();
};

var updatePageState = function(updates) {
    pageState = merge(pageState, updates);
};

var setPageColumn = function(column) {
    if (pageState.column === column) {
        updatePageState({ sortDirection: ! pageState.sortDirection });
    } else {
        updatePageState({ pageNumber: 1, sortColumn: column, sortDirection: PMConstants.ASCENDING  });
    }
};

var Tenant = Parse.Object.extend({

    create: function(name, phone, email, balance) {
        var instance = new Tenant();
        instance.set('name', name);
        instance.set('phone', phone);
        instance.set('email', email);
        instance.set('balance', balance);
        instance.save();
        return instance;
    },

    /*
     var sortDirection = this.state.sortDirection;
     if (!sortField) {
     sortField = this.state.sortField;
     } else if (sortField === this.state.sortField) {
     sortDirection = !sortDirection;
     } else {
     sortDirection = app.ASCENDING;
     }
     */

    getPage: function(sortField, sortDirection, pageNumber, shouldGetCount, countPerPage, cb) {
        var collection = new Tenant.Collection();

        var count, result;
        if (shouldGetCount) {
            count = getCount();
        }

        var start = (pageNumber - 1) * countPerPage;

        collection.query = new Parse.Query(Tenant);
        collection.query.limit(countPerPage);
        collection.query.skip(start);

        if (sortDirection) {
            collection.query.ascending(sortField);
        } else {
            collection.query.descending(sortField);
        }

        var promise;
        if (shouldGetCount && count) {
            console.log("returning when promise");
            promise = Parse.Promise.when(collection.fetch(), count);
        } else {
            promise = collection.fetch();
        }

        promise.then(function(page, count) {
            if (typeof count === 'undefined') {
                console.log('count was undefined');

            }
        }, function(obj,err) {
            console.error('getPage(..) error',obj,err);
        });

    }
});

Tenant.Page = Parse.Collection.extend({
    model: Tenant,

    createTenant: function(name, phone, email, balance) {
        this.add(Tenant.create(name, phone, email, balance));
    }


});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    var tenant;

    switch(action.actionType) {
        case PMConstants.TENANT_CREATE:
            Tenant.create(payload.name, payload.phone, payload.email, payload.balance);
            break;
        case PMConstants.TENANT_SORT:
            setPageColumn(payload.column);
            break;
    }
});

module.exports = TenantStore;