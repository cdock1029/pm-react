/** @jsx React.DOM */
var app = app || {};

app.getPage = function (sortField, pageNumber, countPerPage) {
    var start = pageNumber * countPerPage;
    var stringSort = function (str) {
        return function(a, b) {
            if (a[str] > b[str]) {
                return 1;
            }
            if (a[str] < b[str]) {
                return -1;
            }
            return 0;
        };
    };
    buildings.sort(stringSort(sortField));
    return buildings.slice(start, countPerPage);

};

(function () {
    'use strict';
    var DataPage = React.createClass({
        getInitialState: function () {
            return {
                sortField: 'name',
                pageNumber: 0
            };
        },
        render: function () {
            return (
                <div>
                    <BuildingTable buildings={this.props.data} />
                    <Pagination />
                </div>
            );
        }
    });

    var BuildingTable = React.createClass({
      handleColumnClick: function(event) {
          var columnTitle = event.target.innerHTML;
          this.setState({ sortField: columnTitle.toLowerCase(), pageNumber: 1 });
      },
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
                        <th onClick={this.handleColumnClick}>Name</th>
                        <th onClick={this.handleColumnClick}>Address</th>
                        <th onClick={this.handleColumnClick}>City</th>
                        <th onClick={this.handleColumnClick}>State</th>
                        <th onClick={this.handleColumnClick}>Zip</th>
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

    var Pagination = React.createClass({
        render: function () {
            return (
                <ul className="pagination">
                    <li><a href="#">&laquo;</a></li>
                    <li><a href="#">&raquo;</a></li>
                </ul>
            );
        }
    });

    var PageNumberButtons = React.createClass({
        render: function () {

        }
    });

    var model = app.model;
    var Router = Backbone.Router.extend({
        routes: {
            "buildings" : "buildings",
            "tenants" : "tenants"
        },
        buildings : function () {
            React.renderComponent(
                <DataPage data={model.buildings} pageSize={2} defaultSort={'name'}/>,
                document.getElementById('content')
            );
        },
        tenants : function () {
            React.renderComponent(
                <h1>Tenants Page</h1>,
                document.getElementById('content')
            );
            // React.renderComponent(
            //     <DataPage data={model.tenants} pageSize={2} defaultSort={'name'}/>,
            //     document.getElementById('content')
            // );
        }
    });
    new Router();
    Backbone.history.start();
})();
