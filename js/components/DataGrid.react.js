var React = require('react');
var DataTable = require('./DataTable.react');
var Pagination = require('./Pagination.react');

var getData = function(modelType, sortField, sortDirection, pageNumber, shouldGetcount) {

};

/**
 * Encapsulates Data table, Pagination buttons, and defines callback
 * function to navigate between pages of data.
 */
var DataGrid = React.createClass({
    getInitialState: function () {
        return {
            sortField: 'id',
            sortDirection: app.ASCENDING,
            currentPageNumber: 1,
            page:[],
            count: 0
        };
    },
    stateSetter: function(pageNumber, sortField, sortDirection, shouldGetCount) {
        var pagePromise = app.getData(this.props.modelType, sortField, sortDirection, pageNumber, shouldGetCount);
        pagePromise.then(function (page, count) {
            if (typeof count === 'undefined') {
                console.log("count was undefined");
                count = this.state.count;
            }
            window.pageObj = page;
            console.log("inside pagePromise.then");
            this.setState({ sortField: sortField, sortDirection: sortDirection, currentPageNumber: pageNumber, page: page, count: count });
        }.bind(this));
    },
    componentDidMount: function () {
        this.stateSetter(1, 'id', app.ASCENDING, true);
    },
    updatePage: function(pageNumber, sortField) {
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
        var numberOfPages = Math.ceil(this.state.count / app.COUNT_PER_PAGE);
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