var app = app || {};

(function () {
	'use strict';

	app.Utils = {
        store: function () {

        },
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };

    app.ASCENDING = true;
    app.DESCENDING = false;

    app.getPageData = function (modelType, sortField, sortDirection, pageNumber, countPerPage) {
        var start = (pageNumber - 1) * countPerPage;
        console.log("start index: " + start);
        var stringSort = function (str) {
            return function(a, b) {
                if (a[str] > b[str]) {
                    return sortDirection ? 1 : -1;
                }
                if (a[str] < b[str]) {
                    return sortDirection ? -1 : 1;
                }
                return 0;
            };
        };
        var raw = app.model[modelType];
        raw.sort(stringSort(sortField));
        return { data: raw.slice(start, start + countPerPage), totalCount: raw.length };
    };

})();
