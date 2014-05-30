/** @jsx React.DOM */
var React = require('react');
var DataTable = require('./DataTable.react');
var Pagination = require('./Pagination.react');

/**
 * Encapsulates Data table, Pagination buttons, and defines callback
 * function to navigate between pages of data.
 */
var DataGrid = React.createClass({
    getInitialState: function () {
        return this.getState();
    },
    componentDidMount: function () {
        this.props.store.addChangeListener(this._onChange);
        this.props.store.reloadData();
    },
    componentWillUnmount: function() {
        this.props.store.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        console.log("_onChange in DataGrid called");
        this.setState(this.getState());
    },
    getState: function() {
        return this.props.store.getPageState();
    },
    render: function () {
        var dataColumns = this.props.store.getDataColumns();
        var heading = this.props.store.getTableHeading();
        var numberOfPages = Math.ceil(this.state.count / this.state.countPerPage);
        console.log('count: ' + this.state.count + ', numberOfPages: ' + numberOfPages + ', pageNumber: ' + this.state.pageNumber);
        return (
            <div>
                <DataTable data={this.state.page} dataColumns={dataColumns} actions={this.props.actions} tableHeading={heading} sortColumn={this.state.sortColumn} sortDirection={this.state.sortDirection} form={this.props.form} />
                <Pagination numberOfPages={numberOfPages} currentPage={this.state.pageNumber} action={this.props.actions.paginationTransition}/>
            </div>
        );
    }
});

module.exports = DataGrid;