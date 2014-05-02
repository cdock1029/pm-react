/** @jsx React.DOM */
var buildings = [
  {id:"1", name:"2200 Westlake",address:"900 Lenora St.",city:"Seattle",state:"WA",zip:"98121"},
  {id:"2", name:"Phase 5",address:"25 Main St",city:"Austin",state:"TX",zip:"79703"},
  {id:"3", name:"Amzn",address:"123 Boren Ave.",city:"Seattle",state:"WA",zip:"98121"}
];

var BuildingTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.buildings.forEach(function(building) {
      rows.push(<BuildingRow building={building} key={building.id}/>);
    });

    return (
      <div className="building-table">
        <div className="page-header">
          <h1>Buildings</h1>
        </div>
          <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
      </div>
    );
  }
});

var BuildingRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.building.name}</td>
        <td>{this.props.building.address}</td>
        <td>{this.props.building.city}</td>
        <td>{this.props.building.state}</td>
        <td>{this.props.building.zip}</td>
      </tr>
    );
  }
});

React.renderComponent(
  <BuildingTable buildings={buildings} />,
  document.getElementById('content')
);
