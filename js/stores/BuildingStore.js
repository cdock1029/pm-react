var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PMConstants = require('../constants/PMConstants');
var merge = require('react/lib/merge');

var MODEL = 'Building';

var CHANGE = PMConstants.CHANGE + PMConstants.BUILDINGS;
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
    pageState = merge(pageState, { isLoading: isLoading });
};

var getCountPromise = function() {
    var query = new Parse.Query(MODEL);
    return query.count();
};

var updatePageState = function(updates) {
    pageState = merge(pageState, updates);
};

var setCountPerPage = function(countPerPage) {
    updatePageState({ countPerPage: countPerPage });
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
    console.log("BuildingStore: fetchPageData");
    setIsLoading(true);
    BuildingStore.emitChange(CHANGE); //forcing component update TODO? :/
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

var createBuilding = function(entity, cb) {
    var Building = Parse.Object.extend(MODEL);
    var building = new Building();

    building.set('name', entity.name);
    building.set('address', entity.address);
    building.set('city', entity.city);
    building.set('state', entity.state);
    building.set('zip', entity.zip);

    building.save(null, {
        success: function (building) {
            cb();
        },
        error: function (building, error) {
            alert('Failed to save building. ' + error.description);
        }
    });
};

var BuildingStore = merge(EventEmitter.prototype, {

    getPageState: function() {
        console.log('BuildingStore.getPageState');
        return pageState;
    },
    getDataColumns: function() {
        return ['name', 'address', 'city', 'state', 'zip'];
    },
    addChangeListener: function(eventType, callback) {
        this.on(eventType, callback);
    },
    removeChangeListener: function(eventType, callback) {
        this.removeListener(eventType, callback);
    },
    getTableHeading: function() {
        return PMConstants.BUILDINGS;
    },
    reloadData: function() {
        fetchPageData(true, BuildingStore.emitChange.bind(null, CHANGE));
    },
    emitChange: function (eventType) {
        BuildingStore.emit(eventType);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case PMConstants.CREATE + PMConstants.BUILDINGS:
            createBuilding(action.entity, function() {
                setPageNumber(1);
                fetchPageData(true, BuildingStore.emitChange.bind(null, CHANGE));
            });
            break;
        case PMConstants.SORT + PMConstants.BUILDINGS:
            console.log('Dispatch action type SORT');
            setSortColumn(action.column);
            fetchPageData(true, BuildingStore.emitChange.bind(null, CHANGE));
            break;
        case PMConstants.TRANSITION + PMConstants.BUILDINGS:
            console.log('transition between data page');
            setPageNumber(action.pageNumber);
            fetchPageData(false, BuildingStore.emitChange.bind(null, CHANGE));
            break;
        case PMConstants.CHANGE_PAGE_COUNT + PMConstants.BUILDINGS:
            setCountPerPage(action.countPerPage);
            fetchPageData(true, BuildingStore.emitChange.bind(null, CHANGE));
            break;
        default:
            return true;
    }
});

module.exports = BuildingStore;