/** @jsx React.DOM */
var React = require('react');

var LoadingBar = React.createClass({
    render: function() {
        return (
            <span>
                <img src="../public/load-bar.gif" alt="Loading..."/>
            </span>
        );
    }
});

module.exports = LoadingBar;