/** @jsx React.DOM */
var React = require('react');
var TenantStore = require('../stores/TenantStore');

var NewTenantForm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            phone: '',
            email: '',
            balance: 0
        };
    },
    handleChange: function(event) {
        var state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    },
    render: function() {
        return (
            <form role="form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="newName" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="newEmail" />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={this.state.phone} onChange={this.handleChange} className="form-control" id="newPhone"  />
                </div>
                <div className="form-group">
                    <label>Balance</label>
                    <input type="number" name="balance" value={this.state.balance} onChange={this.handleChange} className="form-control" id="newBalance" min="0" step="0.01" />
                </div>
            </form>
        );
    },
    getFormData: function() {
        return this.state;
    }
});

module.exports = NewTenantForm;