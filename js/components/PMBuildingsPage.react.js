/** @jsx React.DOM */
var React = require('react');
var Header = require('./Header.react');
var DataGrid = require('./DataGrid.react');
var NewBuildingForm = require('./NewBuildingForm.react');
var PMConstants = require('../constants/PMConstants');

var BuildingActions = require('../actions/BuildingActions');
var BuildingStore = require('../stores/BuildingStore');

var PMBuildingsPage = React.createClass({
    render: function () {
        console.log('rendering PMBuildingsPage');
        return (
            <div className="container">
                <Header active={'Buildings'} />
                <DataGrid entityType={PMConstants.BUILDINGS} actions={BuildingActions} createAction={this._createNewBuilding} store={BuildingStore} form={<NewBuildingForm ref='buildingForm' />} />
            </div>
        );
    },
    _createNewBuilding: function() {
        var building = this.refs.buildingForm.getFormData();
        BuildingActions.create(building);
    }
});

module.exports = PMBuildingsPage;
