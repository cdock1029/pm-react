/** @jsx React.DOM */
/**
 * Backbone Router
 */
var Router = Backbone.Router.extend({
    routes: {
        'buildings' : 'buildings',
        'tenants' : 'tenants'
    },
    buildings: function() {
        this.current = 'buildings';
    },
    tenants : function() {
        this.current = 'tenants';
    }
});

var React = require('react');
var PMApp = require('./components/PMApp.react');
var router = new Router();

React.renderComponent(<PMApp router={router} />, document.getElementById('pm-app'));

Backbone.history.start();