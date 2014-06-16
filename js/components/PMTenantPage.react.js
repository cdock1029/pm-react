/** @jsx React.DOM */
var React = require('react');
var Header = require('./Header.react');
var DataGrid = require('./DataGrid.react');
var TenantSubnav = require('./TenantSubnav.react');
var NewTenantForm = require('./NewTenantForm.react');
var PMConstants = require('../constants/PMConstants');

var TenantActions = require('../actions/TenantActions');
var TenantStore = require('../stores/TenantStore');

var PMTenantPage = React.createClass({
    getInitialState: function() {
        return this.getState();
    },
    getState: function() {
        return TenantStore.getSubNavState();
    },
    componentDidMount: function () {
        TenantStore.addChangeListener(PMConstants.SUB_NAV_CHANGE + PMConstants.TENANTS, this._updateSubNavState);
    },
    componentWillUnmount: function() {
        TenantStore.removeChangeListener(PMConstants.SUB_NAV_CHANGE + PMConstants.TENANTS, this._updateSubNavState);
        console.log('PMTenantPage componentWillUnmount');
    },
    render: function () {
        console.log("rendering PMTenantPage.");
        if (this.state.entity) {
            tenantSubnav = <TenantSubnav data={this.state} actions={TenantActions} id={this.state.entity.id} />; //TODO need id here? pass entity?
        } else {
            tenantSubnav = <noscript />;
        }
        return (
            <div className="container">
                <Header active={'Tenants'} />
                <DataGrid entityType={PMConstants.TENANTS} actions={TenantActions} createAction={this._createNewTenant} store={TenantStore} form={<NewTenantForm ref="tenantForm" />} />
                {tenantSubnav}
            </div>
        );
    },
    _createNewTenant: function() {
        var tenant = this.refs.tenantForm.getFormData();
        TenantActions.create(tenant);
    },
    _updateSubNavState: function() {
        console.log('PMTenant - _updateSubNavState callback');
        var state = this.getState();
        console.log('entity: ' + state.entity);
        this.setState(state);
    }
});

module.exports = PMTenantPage;
