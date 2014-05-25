/** @jsx React.DOM */
var React = require('react');
var ReactHack = require('ReactHack');
var DataTable = require('./DataTable.react');
var Pagination = require('./Pagination.react');

var getData = function(modelType, sortField, sortDirection, pageNumber, shouldGetcount) {
    return app.getData(modelType, sortField, sortDirection, pageNumber, shouldGetcount);
};

/**
 * Encapsulates Data table, Pagination buttons, and defines callback
 * function to navigate between pages of data.
 */
var DataGrid = React.createClass({
    stateSetter: function(keyArr) {
        return function(valueArr) {
            var newState = {};
            keyArr.forEach(function(key, index) {
                newState[key] = valueArr[index];
            });
            this.setState(newState);
        }.bind(this);
    },
    getInitialState: function () {
        return {
            sortField: 'id',
            sortDirection: app.ASCENDING,
            currentPageNumber: 1,
            count: -1,
            page:{}
        };
    },
    componentDidMount: function () {
        this.stateSetter(1, 'id', app.ASCENDING, true);
    },
    fetchData: function() {

    },
    getPage: function(pageNumber, sortField) {
        var sortDirection = this.state.sortDirection;
        if (!sortField) {
            sortField = this.state.sortField;
        } else if (sortField === this.state.sortField) {
            sortDirection = !sortDirection;
        } else {
            sortDirection = app.ASCENDING;
        }
        this.stateSetter(pageNumber, sortField, sortDirection, false);
    },
    render: function () {
        var numberOfPages = Math.ceil(this.state.page.get('count') / app.COUNT_PER_PAGE);
        console.log("total records: " + this.state.count + ", count per page: " + app.COUNT_PER_PAGE + ", number of pages: " + numberOfPages);
        return (
            <div>
                <DataTable data={this.state.page} dataColumns={this.props.dataColumns} updatePageCallback={this.updatePage} tableHeading={this.props.modelType} sortField={this.state.sortField} sortDirection={this.state.sortDirection} form={this.props.form} />
                <Pagination numberOfPages={numberOfPages} currentPage={this.state.currentPageNumber} updatePageCallback={this.updatePage} />
            </div>
        );
    }
});

module.exports = DataGrid;