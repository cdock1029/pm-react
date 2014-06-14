/** @jsx React.DOM */
var React = require('react');
var Header = require('./Header.react');
var DataGrid = require('./DataGrid.react');
var NewTenantForm = require('./NewTenantForm.react');
var NewBuildingForm = require('./NewBuildingForm.react');
var PMConstants = require('../constants/PMConstants');

var TenantActions = require('../actions/TenantActions');
var TenantStore = require('../stores/TenantStore');
var TENANT = 'Tenant';

/**
 * Renders appropriate components on page based on route.
 */
var PMTenantPage = React.createClass({
    _update: function() {
        this.forceUpdate();
    },
    componentDidMount: function() {
        TenantStore.addChangeListener(PMConstants.CREATE + TENANT, this._update);
    },
    componentWillUnmount: function () {
        TenantStore.removeChangeListener(PMConstants.CREATE + TENANT, this._update);
    },
    render: function () {
        console.log("rendering PMTenantPage");
        var model = this.props.model;
        switch (model) {
            default:
                return (
                    <div className="container">
                        <Header />
                        <DataGrid actions={TenantActions} createAction={this._createNewTenant} store={TenantStore} form={<NewTenantForm ref="tenantForm" />} />
                    </div>
                );
        }
    },
    _createNewTenant: function() {
        var tenant = this.refs.tenantForm.getFormData();
        TenantActions.create(tenant);
    },
    _creationSuccessful: function() {

    }
});

module.exports = PMTenantPage;
