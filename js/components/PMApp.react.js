/** @jsx React.DOM */
var React = require('react');
var Header = require('./Header.react');
var DataGrid = require('./DataGrid.react');
var NewTenantForm = require('./NewTenantForm.react');
var NewBuildingForm = require('./NewBuildingForm.react');

var TenantActions = require('../actions/TenantActions');
var TenantStore = require('../stores/TenantStore');

/**
 * Renders appropriate components on page based on route.
 */
var PMApp = React.createClass({
    componentWillMount: function () {
        this.callback = (function () {
            console.log("router on route");
            this.forceUpdate();
        }.bind(this));
        this.props.router.on('route', this.callback)
    },
    componentWillUnmount: function () {
        this.callback = (function () {
            console.log("router off route");
            this.forceUpdate();
        }.bind(this));
        this.props.router.off('route', this.callback);
    },
    render: function () {
        var app;
        switch(this.props.router.current) {
            /*
            case 'buildings':
                app = (
                    <div>
                        <Header />
                        <DataGrid modelType={'Building'} dataColumns={['name', 'address', 'city', 'state', 'zip']} form={<NewBuildingForm />}/>
                    </div>
                );
                break;*/
            case 'tenants':
                app = (
                    <div>
                        <Header />
                        <DataGrid actions={TenantActions} store={TenantStore} form={<NewTenantForm />} />
                    </div>
                );
                break;
            default:
                //TODO do this the right way, not sure
                app = <h1>404 Not Found</h1>;
                break;
        }
        return app;
    }
});

module.exports = PMApp;
