var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _tenants = [
    {
        "id": 0,
        "name": "Meredith Barlow",
        "phone": "(840) 412-3566",
        "email": "meredithbarlow@musanpoly.com",
        "balance": 27986
    },
    {
        "id": 1,
        "name": "Goff Warner",
        "phone": "(821) 539-2661",
        "email": "goffwarner@musanpoly.com",
        "balance": 9591
    },
    {
        "id": 2,
        "name": "Sparks Fields",
        "phone": "(960) 576-3894",
        "email": "sparksfields@musanpoly.com",
        "balance": 32924
    },
    {
        "id": 3,
        "name": "Michele Adkins",
        "phone": "(823) 494-3723",
        "email": "micheleadkins@musanpoly.com",
        "balance": 22233
    },
    {
        "id": 4,
        "name": "Vasquez Workman",
        "phone": "(934) 535-3037",
        "email": "vasquezworkman@musanpoly.com",
        "balance": 9897
    },
    {
        "id": 5,
        "name": "Nikki Knowles",
        "phone": "(951) 514-3013",
        "email": "nikkiknowles@musanpoly.com",
        "balance": 3652
    }
];


function create(name, phone, email, balance) {
    _tenants.push({
        id: _tenants.length,
        name: name,
        phone: phone,
        email: email,
        balance: balance
    });
}

var TenantStore = merge(EventEmitter.prototype, {
    getPage: function(sortField, sortDirection, pageNumber, countPerPage, shouldGetCount) {
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
        var count = shouldGetCount ? _tenants.length : -1;
        _tenants.sort(stringSort(sortField));
        return { data: _tenants.slice(start, start + countPerPage), totalCount: count };
    }

});