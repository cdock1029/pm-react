/** @jsx React.DOM */
var React = require('react');
var ModalTrigger = require('./ModalTrigger.react');
var DataRow = require('./DataRow.react');
var LoadingSpinner = require('./LoadingSpinner.react');
var LoadingBar = require('./LoadingBar.react');

/**
 * All Data rows, and table header/title
 */
var DataTable = React.createClass({
    getInitialState: function() {
        return {
            top:0,
            outerWidth:0,
            outerHeight:0,
            width:0,
            height:0
        };
    },
    componentDidMount: function() {
        var $tbody = $(this.refs.tbody.getDOMNode());
        this.setState({
            top: $tbody.offset().top,
            outerWidth: $tbody.outerWidth(),
            outerHeight: $tbody.outerHeight(),
            width: $tbody.width(),
            height: $tbody.height()
        });
    },
    measureTableBody: function() {
        console.log("measuringTableBody");
        var $tbody = $(this.refs.tbody.getDOMNode());
        var curr = {
            top: $tbody.offset().top,
            outerWidth: $tbody.outerWidth(),
            outerHeight: $tbody.outerHeight(),
            width: $tbody.width(),
            height: $tbody.height()
        };
        this.checkEqual(this.state, curr);
    },
    checkEqual: function(prev, curr) {
        var updates = {};
        var shouldSetState = false;
        for (var propt in curr) {
            if (! curr.hasOwnProperty(propt)) {
                continue;
            }
            if (curr[propt] !== prev[propt]) {
                shouldSetState = true;
                updates[propt] = curr[propt];
            }
        }
        if (shouldSetState) {
            console.log("updates found!");
            this.setState(updates);
        } else {
            console.log("NO update necessary");
        }
    },
    render: function() {
        var headers = [];
        var rows = [];
        var dataColumns = this.props.dataColumns;
        this.props.data.forEach(function(row) {
            var tableRow = { id: row.id };
            dataColumns.forEach(function(column) {
                tableRow[column] = row.attributes[column];
            });
            rows.push(<DataRow row={tableRow} key={tableRow.id} />);
        });
        dataColumns.forEach(function (column) {
            var sortLabel;
            if (column === this.props.sortColumn) {
                if (this.props.sortDirection) {
                    //true === ASCENDING
                    sortLabel = ' \u25B2';
                } else {
                    //DESCENDING
                    sortLabel = ' \u25BC';
                }
            }
            headers.push(<th onClick={this._onTableHeaderClick.bind(null, column)} key={column}>{app.Utils.capitalize(column)}<small>{sortLabel}</small></th>);
        }.bind(this));
        var heading = this.props.tableHeading;

        var newTenantButton = <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-plus"></span>  New</button>;
        var modalHeader = <div className="modal-header"><button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 className="modal-title">Create new {this.props.tableHeading}</h4></div>;
        var modalBody = <div className="modal-body">{this.props.form}</div>;
        var modalFooter = (
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this._onCreateClick}>Create</button>
            </div>
        );
        var spinner, loadingBar;
        if (this.props.isLoading) {
            console.log("check if loading: true");
            spinner = <LoadingSpinner location={this.state} />;
            loadingBar = <LoadingBar />;
        } else {
            console.log("check if loading: false");
            spinner = <noscript />;
            loadingBar = <noscript />;
        }
        return (
            <div className="data-table">
                <ul className="list-inline">
                    <li><h2>{app.Utils.capitalize(this.props.tableHeading)}&nbsp;</h2></li>
                    <li><ModalTrigger trigger={newTenantButton} header={modalHeader} body={modalBody} footer={modalFooter}/></li>
                    <li><select className="form-control">
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                    </select></li>
                    <li>{loadingBar}</li>
                </ul>
                <table className="table table-hover table-bordered table-condensed">
                    <thead>
                        <tr>
                        {headers}
                        </tr>
                    </thead>
                    <tbody ref="tbody">{rows}</tbody>
                </table>
                {spinner}
            </div>
        );
    },
    _onTableHeaderClick: function (column) {
        this.props.actions.sortColumn(column);
    },
    _onCreateClick: function() {
        this.props.createAction();
    }
});

module.exports = DataTable;