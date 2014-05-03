/** @jsx React.DOM */
var buildingsData = [
  {id:"1", name:"2200 Westlake",address:"900 Lenora St.",city:"Seattle",state:"WA",zip:"98121"},
  {id:"2", name:"Phase 5",address:"25 Main St",city:"Austin",state:"TX",zip:"79703"},
  {id:"3", name:"Amzn",address:"123 Boren Ave.",city:"Seattle",state:"WA",zip:"98121"}
];

var BuildingTable = React.createClass({
  getInitialState: function() {
      return {
          sortField: 'name'
      };
  },
  handleNameClick: function() {
      this.setState({sortField: 'name'});
  },
  handleAddressClick: function() {
      this.setState({sortField: 'address'});
  },
  render: function() {
    var rows = [];
    if (this.state.sortField === 'name') {
      rows.push(<BuildingRow building={this.props.buildings[0]} key={this.props.buildings[0].id}/>);
      rows.push(<BuildingRow building={this.props.buildings[2]} key={this.props.buildings[2].id}/>);
      rows.push(<BuildingRow building={this.props.buildings[1]} key={this.props.buildings[1].id}/>);
    } else if (this.state.sortField === 'address') {
      rows.push(<BuildingRow building={this.props.buildings[2]} key={this.props.buildings[2].id}/>);
      rows.push(<BuildingRow building={this.props.buildings[1]} key={this.props.buildings[1].id}/>);
      rows.push(<BuildingRow building={this.props.buildings[0]} key={this.props.buildings[0].id}/>);
    }
    // this.props.buildings.forEach(function(building) {
    //   rows.push(<BuildingRow building={building} key={building.id}/>);
    // });

    return (
      <div className="building-table">
        <div className="page-header">
          <h1>Buildings</h1>
        </div>
          <table className="table table-hover">
                <thead>
                    <tr>
                        <th onClick={this.handleNameClick}>Name</th>
                        <th onClick={this.handleAddressClick}>Address</th>
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
  <BuildingTable buildings={buildingsData} />,
  document.getElementById('content')
);
