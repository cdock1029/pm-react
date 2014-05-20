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
                    <label>Email</label>
                    <input type="email" className="form-control" id="newEmail" placeholder="Enter email"/>
                </div>
            </form>
        );
    }
});

module.exports = NewTenantForm;