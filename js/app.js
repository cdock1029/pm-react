/** @jsx React.DOM */
var React = require('react')
    Fluxxor = require('fluxxor'),
    Store = require('./stores/TenantDataStore');

var TenantDataStore = Store.store,
    actions = Store.actions;

window.React = React;

var stores = {
    TenantDataStore: new TenantDataStore()
};

var flux = new Fluxxor.Flux(stores, actions);
window.flux = flux;


//Page components
var PMTenantPage = require('./components/PMTenantPage.react');
var PMBuildingsPage = require('./components/PMBuildingsPage.react');
var PMPage = require('./components/PMPage.react');

var currentView = null;
var rootNode = document.body;
var setView = function(view) {
    if (currentView) {
        console.log("Unmounting " + currentView);
        React.unmountComponentAtNode(rootNode);
    }
    currentView = view;
    React.renderComponent(currentView, rootNode);
};

var Router = Parse.Router.extend({
    initialize: function() {
        Parse.history.start();
    },
    routes: {
        '': 'home',
        buildings : 'buildings',
        'buildings/:id': 'buildingId',
        'buildings/:id/:subnav': 'buildingNav',
        tenants : 'tenants',
        'tenants/:id': 'tenantId',
        'tenants/:id/:subnav': 'tenantNav',
        apartments : 'apartments'
    },
    home: function() {
        setView(<PMPage flux={flux} />);
    },
    buildings: function() {
        setView(<PMBuildingsPage />);
    },
    tenants : function() {
        setView(<PMTenantPage />);
    },
    tenantId: function(id) {
        setView(<PMTenantPage id={id}/>);
    },
    tenantNav: function(id, subnav) {
        setView(<PMTenantPage id={id} subnav={subnav} />);
    },
    buildingId: function(id) {
        setView(<PMBuildingsPage id={id}/>);
    },
    buildingNav: function(id, subnav) {
        setView(<PMBuildingsPage id={id} subnav={subnav} />);
    }
});
new Router;

