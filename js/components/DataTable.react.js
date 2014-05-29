/** @jsx React.DOM */
var React = require('react');
var ModalTrigger = require('./ModalTrigger.react');
var DataRow = require('./DataRow.react');

/**
 * All Data rows, and table header/title
 */
var DataTable = React.createClass({
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

        var newTenantButton = <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-plus"></span>  New</button>;
        var modalHeader = <div className="modal-header"><button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 className="modal-title" id="myModalLabel">Modal title</h4></div>;
        var modalFooter = <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
        </div>;
        var modalBody = <div className="modal-body">{this.props.form}</div>;

        return (
            <div className="data-table">
                <h2>{app.Utils.capitalize(this.props.tableHeading)}&nbsp;
                    <ModalTrigger trigger={newTenantButton} header={modalHeader} body={modalBody} footer={modalFooter}/>
                </h2>
                <table className="table table-hover table-bordered table-condensed">
                    <thead>
                        <tr>
                        {headers}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    },
    _onTableHeaderClick: function (column) {
        this.props.actions.sortColumn(column);
    }
});

module.exports = DataTable;