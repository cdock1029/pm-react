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

    app.getPageData = function (modelType, sortField, sortDirection, pageNumber, countPerPage) {
        var start = (pageNumber - 1) * countPerPage;

        var Model = Parse.Object.extend('Building');//(modelType);

        var query = new Parse.Query(Model);
        query.limit(countPerPage);
        query.skip(start);

        if (sortDirection) {
            query.ascending(sortField);
        } else {
            query.descending(sortField);
        }

        return query.find();
    };

})();
