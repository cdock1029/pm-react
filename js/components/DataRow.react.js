/** @jsx React.DOM */
var React = require('react');

/**
 * A Row of data within a table
 */
var DataRow = React.createClass({
    render: function() {
        var cells = [];
        var row = this.props.row;
        var firstColumn = true;
        var id = row['id'];
        for (var column in row) {
            if (! row.hasOwnProperty(column)) {
                continue;
            }
            if (column != 'id') {
                var cellData;
                /*if (firstColumn) {
                    cellData = <a href={'#/' + this.props.route.toLowerCase() + '/' + id}>{row[column]}</a>;
                    firstColumn = false;
                } else {*/
                    cellData = row[column];
                //}
                cells.push(<td key={column}>{cellData}</td>);
            }
        }
        return (
            <tr onClick={this.props.action}>
            {cells}
            </tr>
        );
    }
});

module.exports = DataRow;