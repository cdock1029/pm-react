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
                            <li className={this.props.active == 'Buildings' ? 'active' : ''}><a href="#/buildings">Buildings</a></li>
                            <li className={this.props.active == 'Apartments' ? 'active' : ''}><a href="#">Apartments</a></li>
                            <li className={this.props.active == 'Tenants' ? 'active' : ''}><a href="#/tenants">Tenants</a></li>
                            <li className={this.props.active == 'Leases' ? 'active' : ''}><a href="#">Leases</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Header;