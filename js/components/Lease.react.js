/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');
var accounting = require('accounting');

var Lease = React.createClass({
    render: function() {
        var attributes = this.props.lease.attributes;
        var start = moment(attributes.startDate);
        var end = moment(attributes.endDate);
        var apt = attributes.apartment.attributes;
        var building = apt.building.attributes;
        return (
            <div>
                <h5>ID: {this.props.lease.id}</h5>
                <ul className="list-unstyled">
                    <li>
                    <address>
                        <strong>{building.name}</strong><br/>
                        {building.address}<br/>
                        {building.city}, {building.state} {building.zip}
                    </address>
                    </li>
                    <li>Start date: {start.format('YYYY-MM-DD HH:mm')}</li>
                    <li>End date: {end.format('YYYY-MM-DD HH:mm')}</li>
                    <li>Rent: {accounting.formatMoney(attributes.rent / 100.0)}</li>
                </ul>
            </div>
        );

    }
});

module.exports = Lease;