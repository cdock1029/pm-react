var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
    CREATE: 'create',
    CREATE_COMPLETE: null,
    SORT: null,
    CHANGE: 'CHANGE',
    CHANGE_PAGE_COUNT: null,
    TRANSITION: null,
    DATA_LOADED: null,
    LOAD_AND_SHOW_DETAILS: null,
    SHOW_DETAILS: null,
    SHOW_LEASES: null,
    SHOW_TRANSACTIONS: null,
    SUB_NAV_CHANGE: null,
    ASCENDING: true,
    DESCENDING: false,
    TENANTS: 'Tenants',
    BUILDINGS: 'Buildings',
    APARTMENTS: 'Apartments'
});