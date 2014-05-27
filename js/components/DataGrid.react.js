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
    },
    componentWillUnmount: function() {
        this.props.store.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(this.getState());
    },
    getState: function() {
        return this.store.getPageState();
    },
    render: function () {
        var dataColumns = this.store.getDataColumns();
        var numberOfPages = Math.ceil(this.state.count / app.COUNT_PER_PAGE);
        return (
            <div>
                <DataTable data={this.state} dataColumns={dataColumns} tableHeading={this.props.modelType} sortField={this.state.sortField} sortDirection={this.state.sortDirection} form={this.props.form} />
                <Pagination numberOfPages={numberOfPages} currentPage={this.state.pageNumber} />
            </div>
        );
    }
});

module.exports = DataGrid;