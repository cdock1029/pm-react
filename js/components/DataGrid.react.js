/** @jsx React.DOM */
var React = require('react');
var DataTable = require('./DataTable.react');
var Pagination = require('./Pagination.react');

var getState = function(store) {
    var state = store.getPageState();
    return {
        sortField: state.sortField,
        sortDirection: state.sortDirection,
        pageNumber: state.pageNumber,
        count: state.count,
        page: state.page
    };
};

/**
 * Encapsulates Data table, Pagination buttons, and defines callback
 * function to navigate between pages of data.
 */
var DataGrid = React.createClass({
    getInitialState: function () {
        return getState(this.props.store);
    },
    componentDidMount: function () {
        this.props.store.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        this.props.store.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getState(this.props.store));
    },
    getPage: function(pageNumber, sortField) {

        this.stateSetter(pageNumber, sortField, sortDirection, false);
    },
    render: function () {
        var numberOfPages = Math.ceil(this.state.page.get('count') / app.COUNT_PER_PAGE);
        console.log("total records: " + this.state.count + ", count per page: " + app.COUNT_PER_PAGE + ", number of pages: " + numberOfPages);
        return (
            <div>
                <DataTable data={this.state} dataColumns={this.props.dataColumns} updatePageCallback={this.updatePage} tableHeading={this.props.modelType} sortField={this.state.sortField} sortDirection={this.state.sortDirection} form={this.props.form} />
                <Pagination numberOfPages={numberOfPages} currentPage={this.state.pageNumber} updatePageCallback={this.updatePage} />
            </div>
        );
    }
});

module.exports = DataGrid;