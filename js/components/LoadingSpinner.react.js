/** @jsx React.DOM */
var React = require('react');

var LoadingSpinner = React.createClass({
   render: function() {
        var location = this.props.location;
        var top = location.height / 2 - 32;
        var left = location.width / 2 - 32;
        console.log("rendering LoadingSpinner ON");
        return (
            <div className="overlay" style={{top: location.top, width: location.outerWidth, height: location.outerHeight}}>
            <img className="img-load" src="../public/loading.gif" alt="Loading..." style={{top: top, left: left}} />
            </div>
        );
   }
});

module.exports = LoadingSpinner;