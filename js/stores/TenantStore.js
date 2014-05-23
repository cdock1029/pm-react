var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var merge = require('react/lib/merge');

var getCount = function() {
    var query = new Parse.Query(Tenant);
    return query.count();
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
    sortField: 'id',
    sortDirection: app.ASCENDING,
    currentPageNumber: 1,
    count:-1,
    countPerPage:10,

    createTenant: function(name, phone, email, balance) {
        this.add(Tenant.create(name, phone, email, balance));
    }


});

module.exports = Tenant;