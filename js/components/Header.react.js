/** @jsx React.DOM */
var React = require('react');
//TODO actions

var Header = React.createClass({
    render: function() {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Property Manager</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Home</a></li>
                            <li><a href="#/buildings">Buildings</a></li>
                            <li><a href="#">Apartments</a></li>
                            <li><a href="#/tenants">Tenants</a></li>
                            <li><a href="#">Leases</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Header;