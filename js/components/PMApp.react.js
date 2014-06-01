/** @jsx React.DOM */
var React = require('react');
var Header = require('./Header.react');
var DataGrid = require('./DataGrid.react');
var NewTenantForm = require('./NewTenantForm.react');
var NewBuildingForm = require('./NewBuildingForm.react');
var PMConstants = require('../constants/PMConstants');

var TenantActions = require('../actions/TenantActions');
var TenantStore = require('../stores/TenantStore');

/**
 * Renders appropriate components on page based on route.
 */
var PMApp = React.createClass({
    componentWillMount : function() {
        this.callback = (function() {
            this.forceUpdate();
        }).bind(this);

        this.props.router.on("route", this.callback);
    },
    componentDidMount: function() {
        TenantStore.addChangeListener(PMConstants.CREATE, this.callback);
    },
    componentWillUnmount: function () {
        TenantStore.removeChangeListener(PMConstants.CREATE, this.callback);
        this.props.router.off("route", this.callback);
    },
    render: function () {
        console.log("rendering PMApp");
        var app;
        switch(this.props.router.current) {
            case 'buildings':
                console.log("route is buildings");
                app = <h2>building placeholder</h2>;
                break;
            case 'tenants':
                console.log("route is tenants");
                app = (
                    <div>
                        <Header />
                        <DataGrid actions={TenantActions} createAction={this._createNewTenant} store={TenantStore} form={<NewTenantForm ref="tenantForm" />} />
                    </div>
                );
                break;
            default:
                app = <h1>404 Not Found</h1>;
                break;
        }
        return app;
    },
    _createNewTenant: function() {
        var tenant = this.refs.tenantForm.getFormData();
        TenantActions.create(tenant);
    },
    _creationSuccessful: function() {

    }
});

module.exports = PMApp;
