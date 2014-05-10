var app = app || {};

(function () {
	'use strict';

    Parse.initialize(app.Parse.applicationId, app.Parse.javaScriptKey);

	app.Utils = {
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };

    app.ASCENDING = true;
    app.DESCENDING = false;
    app.COUNT_PER_PAGE = 3;

    var getCount = function(model) {
        console.log("inside getcount function");
        var query = new Parse.Query(model);
        return query.count();
    };

    app.getData = function (modelType, sortField, sortDirection, pageNumber, shouldGetCount) {
        console.log("getting data -- sortField: " + sortField + ", sortDirection: " + sortDirection + ", pageNumber: " + pageNumber + ", gettingcount? " + shouldGetCount);
        var Model = Parse.Object.extend(modelType);
        var count, result;
        if (shouldGetCount) {
            count = getCount(Model);
        }

        var start = (pageNumber - 1) * app.COUNT_PER_PAGE;

        var query = new Parse.Query(Model);
        query.limit(app.COUNT_PER_PAGE);
        query.skip(start);

        if (sortDirection) {
            query.ascending(sortField);
        } else {
            query.descending(sortField);
        }
        if (shouldGetCount && count) {
            console.log("returning when promise");
            return Parse.Promise.when(query.find(), count);
        }
        return query.find();
    };

})();
