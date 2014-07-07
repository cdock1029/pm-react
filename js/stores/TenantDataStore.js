var Fluxxor = require("fluxxor");

var ParseClient = {
    loadTenantDataPage: function(pageParams, success, failure) {
        var pageNumber = pageParams.pageNumber,
            countPerPage = pageParams.countPerPage,
            sortDirection = pageParams.sortDirection,
            sortColumn = pageParams.sortColumn;

        var Lease = Parse.Object.extend('Lease');
        var start = (pageNumber - 1) * countPerPage;

        var query = new Parse.Query(Lease);
        query.include(['tenant', 'apartment.building']);
        query.limit(countPerPage);
        query.skip(start);
        if (sortDirection) {
            query.ascending(sortColumn);
        } else {
            query.descending(sortColumn);
        }
        query.find().then(success, failure);
    }
};

var constants = {
    GET_PAGE: 'GET_PAGE',
    GET_PAGE_SUCCESS: 'GET_PAGE_SUCCESS',
    GET_PAGE_FAILURE: 'GET_PAGE_FAILURE',
    SORT_ASCENDING: true,
    SORT_DESCENDING: false
};

var clientId = 0;

var actions = {
    getPage: function(pageParams) {
        console.log('TenantDataStore : actions : getPage');
        this.dispatch(constants.GET_PAGE);

        ParseClient.loadTenantDataPage(pageParams, function(leases) {
            console.log('loadTenantDataPage success!');
            LEASES = leases;
            this.dispatch(constants.GET_PAGE_SUCCESS, { tenantDataPage: leases });
        }.bind(this), function(error) {
            console.log('loadTenantDataPage FAIL!');
            this.dispatch(constants.GET_PAGE_FAILURE, { error: error });
        }.bind(this));
    }
};

var TenantDataStore = { store: Fluxxor.createStore({
    initialize: function() {
        this.tenantDataPage = [];
        this.error = null;
        this.sortColumn = 'id';
        this.sortDirection = constants.SORT_ASCENDING;
        this.pageNumber = 1;
        this.countPerPage = 5;
        this.isLoading = true;

        this.bindActions(
            constants.GET_PAGE, this.onGetPage,
            constants.GET_PAGE_SUCCESS, this.onGetPageSuccess,
            constants.GET_PAGE_FAILURE, this.onGetPageFailure
        );
    },
    onGetPage: function(payload) {
        this.loading = true;
        this.tenantDataPage = [];
        this.error = null;
        this.emit('change');
    },
    onGetPageSuccess: function(payload) {
        this.loading = false;
        this.tenantDataPage = payload.tenantDataPage;
        this.error = null;
        this.emit('change');
    },
    onGetPageFailure: function(payload) {
        this.loading = false;
        this.error = 'Error code: ' + payload.error.code + ', message: ' + payload.error.message;
        this.emit('change');
    }
}), actions: actions };

module.exports = TenantDataStore;