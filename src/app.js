/** @jsx React.DOM */
var app = app || {};



(function () {
    'use strict';


    /**
     * Encapsulates Data table, Pagination buttons, and defines callback
     * function to navigate between pages of data.
     */
    var DataGrid = React.createClass({
        getInitialState: function () {
            console.log("in get initial state.");
            return {
                sortField: 'id',
                sortDirection: app.ASCENDING,
                currentPageNumber: 1,
                page:[],
                count: 0
            };
        },
        stateSetter: function(pageNumber, sortField, sortDirection, shouldGetCount) {
            var pagePromise = app.getBuildingsData(sortField, sortDirection, pageNumber, shouldGetCount);
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
            console.log("in component did mount.");
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
                console.log("in render.");
                var numberOfPages = Math.ceil(this.state.count / app.COUNT_PER_PAGE);
                console.log("page length: " + this.state.count + ", count per page: " + app.COUNT_PER_PAGE + ", number of pages: " + numberOfPages);
                return (
                    <div>
                        <DataTable data={this.state.page} dataColumns={this.props.dataColumns} updatePageCallback={this.updatePage} tableHeading={this.props.modelType} sortField={this.state.sortField} sortDirection={this.state.sortDirection} />
                        <Pagination numberOfPages={numberOfPages} currentPage={this.state.currentPageNumber} updatePageCallback={this.updatePage} />
                    </div>
                );

        }
    });

    /**
     * All Data rows, and table header/title
     */
    var DataTable = React.createClass({
      render: function() {
        var headers = [];
        var rows = [];
        this.props.data.forEach(function(row) {
            //TODO temporary hack to get working
            var atts = row.attributes;
            var obj = { id: row.id };
            for (var key in atts) {
                if (atts.hasOwnProperty(key)) {
                    console.log("key: " + key + ", val: " + atts[key]);
                    obj[key] = atts[key];
                }
            }
            rows.push(<DataRow row={obj} key={obj.id} />);
        });
        this.props.dataColumns.forEach(function (column) {
            var sortLabel;
            if (column === this.props.sortField) {
                console.log("sort direction: " + this.props.sortDirection);
                if (this.props.sortDirection) {
                    //true === ASCENDING
                    sortLabel = ' \u25B2';
                } else {
                    //DESCENDING
                    sortLabel = ' \u25BC';
                }
            }
            headers.push(<th onClick={this.props.updatePageCallback.bind(null, 1, column)} key={column}>{app.Utils.capitalize(column)}<small>{sortLabel}</small></th>);
        }.bind(this));

        return (
          <div className="data-table">
            <div className="page-header">
              <h1>{app.Utils.capitalize(this.props.tableHeading)}</h1>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
          </div>
        );
      }
    });

    /**
     * A Row of data within a table
     */
    var DataRow = React.createClass({
      render: function() {
        var cells = [];
        var row = this.props.row;
        for (var column in row) {
            if (row.hasOwnProperty(column) && column !== 'id') {
                cells.push(<td key={column}>{row[column]}</td>);
            }
        }
        return (
          <tr>
            {cells}
          </tr>
        );
      }
    });

    /**
     * Encapsulates all pagination buttons for a data table.
     */
    var Pagination = React.createClass({
        render: function () {
            var pageNumberButtons = [];
            for (var i = 1; i <= this.props.numberOfPages; i++) {
                var button;
                if (this.props.currentPage === i) {
                    //don't add the callback to "current page" button. We're on it already
                    button = <PageButton pageNumber={i} label={i} key={i} />;
                } else {
                    button = <PageButton pageNumber={i} label={i} updatePageCallback={this.props.updatePageCallback} key={i} />;
                }
                pageNumberButtons.push(button);
            }
            var nextButton, previousButton;
            //We're on the LAST page, disable "next"
            if (this.props.currentPage === this.props.numberOfPages) {
                nextButton = <PageButton iconClasses={'glyphicon glyphicon-chevron-right'} />;
            } else {
                nextButton = <PageButton iconClasses={'glyphicon glyphicon-chevron-right'} updatePageCallback={this.props.updatePageCallback} pageNumber={this.props.currentPage + 1}  />;
            }
            //We're on the FIRST page, disable "previous"
            if (this.props.currentPage === 1) {
                previousButton = <PageButton iconClasses={'glyphicon glyphicon-chevron-left'} />;
            } else {
                previousButton = <PageButton iconClasses={'glyphicon glyphicon-chevron-left'} updatePageCallback={this.props.updatePageCallback} pageNumber={this.props.currentPage - 1} />;
            }
            return (
                <ul className="pagination">
                    {previousButton}
                    {pageNumberButtons}
                    {nextButton}
                </ul>
            );
        }
    });

    /**
     * Defines a specific pagination button, one of: Next, previous, and numbered page.
     */
    var PageButton = React.createClass({
        render: function () {
            var pageButton;
            //Next/Previous Buttons
            if (this.props.iconClasses) {
                if (this.props.updatePageCallback) {
                    //Enabled
                    pageButton = <li><span className={this.props.iconClasses} onClick={this.props.updatePageCallback.bind(null, this.props.pageNumber, null)}></span></li>;
                } else {
                    //Disabled
                    pageButton = <li className="disabled"><span className={this.props.iconClasses}></span></li>;
                }
            } else {
                //Number Buttons
                if (this.props.updatePageCallback) {
                    //different page than Current
                    pageButton = <li><span onClick={this.props.updatePageCallback.bind(null, this.props.pageNumber, null)}>{this.props.label}</span></li>;
                } else {
                    //current page button
                    pageButton = <li className="active"><span>{this.props.label}</span></li>;
                }
            }
            return pageButton;
        }
    });

    /**
     * Renders appropriate components on page based on route.
     */
    var AppInterface = React.createClass({
        componentWillMount: function () {
            this.callback = (function () {
                this.forceUpdate();
            }).bind(this);
            this.props.router.on('route', this.callback)
        },
        componentWillUnmount: function () {
            this.props.router.off('route', this.callback);
        },
        render: function () {
            switch(this.props.router.current) {
            case 'buildings':
                return (
                    <div>
                    <DataGrid modelType={'buildings'} dataColumns={['name', 'address', 'city', 'state', 'zip']}/>
                    </div>
                );
                break;
            case 'tenants':
                return (
                    <div>
                    <DataGrid modelType={'tenants'} dataColumns={['name', 'phone', 'email', 'balance']} />
                    </div>
                );
                break;
            default:
                //TODO do this the right way, not sure
                return <h1>404 Not Found</h1>;
                break;
            }
        }
    });

    /**
     * Backbone Router
     */
    var Router = Backbone.Router.extend({
        routes: {
            'buildings' : 'buildings',
            'tenants' : 'tenants'
        },
        buildings : function () {
            this.current = 'buildings';
        },
        tenants : function () {
            this.current = 'tenants';
        }
    });

    var router = new Router();

    React.renderComponent(
        <AppInterface router={router}  />,
        document.getElementById('content')
    );

    Backbone.history.start();
})();
