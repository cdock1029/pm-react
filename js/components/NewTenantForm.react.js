/** @jsx React.DOM */
var React = require('react');

var NewTenantForm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            phone: '',
            email: '',
            balance: 0
        };
    },
    handleChange: function() {

    },
    render: function() {
        return (
            <form role="form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" id="newName" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" id="newEmail" />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" className="form-control" id="newPhone"  />
                </div>
                <div className="form-group">
                    <label>Balance</label>
                    <input type="number" name="balance" className="form-control" id="newBalance" min="0" step="0.01" />
                </div>
            </form>
        );
    }
});

module.exports = NewTenantForm;