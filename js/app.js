/** @jsx React.DOM */
/**
 * Parse Router
 */
(function(){
    "use strict";
    var React = require('react');

    //Page components
    var PMTenantPage = require('./components/PMTenantPage.react');

    var currentView = null;
    var rootNode = document.body;
    var setView = function(view) {
        if (currentView) {
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
            'buildings' : 'buildings',
            'tenants' : 'tenants'
        },
        buildings: function() {
            setView(<div className="container"><h2>building placeholder</h2></div>);
        },
        tenants : function() {
            setView(<PMTenantPage />);
        }
    });
    new Router;
})();

