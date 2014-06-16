/** @jsx React.DOM */
var React = require('react');
var DataTable = require('./DataTable.react');
var Pagination = require('./Pagination.react');
var PMConstants = require('../constants/PMConstants');


/**
 * Encapsulates Data table, Pagination buttons, and defines callback
 * function to navigate between pages of data.
 */
var DataGrid = React.createClass({
    getInitialState: function () {
        console.log("getInitialState");
        return this.getState();
    },
    componentDidMount: function () {
        console.log("DataGrid componentDidMount");
        this.props.store.reloadData();
        this.props.store.addChangeListener(PMConstants.CHANGE + this.props.entityType, this._onChange);
    },
    componentWillUnmount: function() {
        console.log("DataGrid componentWillUnmount");
        this.props.store.removeChangeListener(PMConstants.CHANGE + this.props.entityType, this._onChange);
    },
    _onChange: function() {
        console.log("DataGrid _onChange");
        this.refs.dataTable.measureTableBody();
        this.setState(this.getState());
    },
    getState: function() {
        return this.props.store.getPageState();
    },
    render: function () {
        var dataColumns = this.props.store.getDataColumns();
        var heading = this.props.store.getTableHeading();
        var numberOfPages = Math.ceil(this.state.count / this.state.countPerPage);
        console.log('DataGrid.render count: ' + this.state.count + ', numberOfPages: ' + numberOfPages + ', pageNumber: ' + this.state.pageNumber);
        return (
            <div>
                <DataTable ref="dataTable" page={this.state.page} dataColumns={dataColumns} actions={this.props.actions} createAction={this.props.createAction} tableHeading={heading} sortColumn={this.state.sortColumn} sortDirection={this.state.sortDirection} form={this.props.form} isLoading={this.state.isLoading}  />
                <Pagination numberOfPages={numberOfPages} currentPage={this.state.pageNumber} action={this._makePageTransition}/>
            </div>
        );
    },
    _makePageTransition: function (pageNumber) {
        this.props.actions.paginationTransition(pageNumber);
    }
});

module.exports = DataGrid;