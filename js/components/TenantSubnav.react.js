/** @jsx React.DOM */
var React = require('react');
var PMConstants = require('../constants/PMConstants');
var Lease = require('./Lease.react');

var TenantSubnav = React.createClass({

    componentDidMount: function () {
        console.log('subnav componentDidMount');
        //this.props.store.addChangeListener(PMConstants.DATA_LOADED + PMConstants.TENANTS, this._onLoaded);
    },
    componentWillUnmount: function() {
        //this.props.store.removeChangeListener(PMConstants.DATA_LOADED + PMConstants.TENANTS, this._onLoaded);
    },
    _onLoaded: function() {
        //console.log('_onLoaded called');
        //this.setState(subnavState);
    },
    _onClick: function(action) {
        this.props.actions.showSubNav(action, this.props.id);
    },
    render: function () {
        console.log('TenantSubnav render. subNav: ' + this.props.data.subNav);
        var tenant = this.props.data.entity;
        var subNav = this.props.data.subNav;
        var content;
        switch(subNav) {
            case 'leases':
                var leases = this.props.data.leases;
                var lis = [];
                leases.map(function(lease, index) {
                    lis.push(<Lease lease={lease} key={index} />);
                });
                content = (
                    <div>
                    <h2>leases</h2>
                    <ul>{lis}</ul>
                    </div>
                );
                //this.props.actions.showSubNav(PMConstants.SHOW_LEASES, id);
                break;
            case 'transactions':
                content = <h2>transactions</h2>;
                //this.props.actions.showSubNav(PMConstants.SHOW_TRANSACTIONS, id);
                break;
            case 'details':
                content = <h2>{tenant.attributes.name}</h2>;
                //this.props.actions.showSubNav(PMConstants.SHOW_DETAILS, id);
                break;
            default:
                break;
        }
        return (
            <div>
            <ul className="nav nav-tabs">
            <li className={subNav === 'details'? 'active' : ''}><a onClick={this._onClick.bind(null, PMConstants.SHOW_DETAILS)}>Details</a></li>
            <li className={subNav === 'leases' ? 'active' : ''}><a onClick={this._onClick.bind(null, PMConstants.SHOW_LEASES)}>Leases</a></li>
            <li className={subNav === 'transactions' ? 'active' : ''}><a onClick={this._onClick.bind(null, PMConstants.SHOW_TRANSACTIONS)}>Transactions</a></li>
            </ul>
            {content}
            </div>
        );
    }
});

module.exports = TenantSubnav;