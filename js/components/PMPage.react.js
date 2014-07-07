/** @jsx React.DOM */
var React = require('react'),
    Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PMPage = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TenantDataStore')],

    componentDidMount: function() {
        this.getFlux().actions.getPage({
            pageNumber : 1,
            countPerPage : 5,
            sortDirection : true,
            sortColumn : 'id'
        });
    },

    getStateFromFlux: function() {
        console.log('getting state from flux..');
        store = this.getFlux().store('TenantDataStore');
        return {
            tenantDataPage: store.tenantDataPage,
            error : store.error,
            sortColumn : store.sortColumn,
            sortDirection : store.sortDirection,
            pageNumber : store.pageNumber,
            countPerPage : store.countPerPage,
            isLoading : store.isLoading
        };
    },

    render: function() {
        console.log('rendering..');
        var listItems = this.state.tenantDataPage.map(function(row, index) {
                console.log('list item: ' + row.id);
                return <li key={index}>{'id: ' + row.id + ' tenant: ' + row.attributes.tenant.attributes.name}</li>;
            });

        return (
            <div>
            <h1>placeholder</h1>
            <ul>{listItems}</ul>
            </div>
        );
    }
});

module.exports = PMPage;