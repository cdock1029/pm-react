var React = require('react');

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

module.exports = DataRow;