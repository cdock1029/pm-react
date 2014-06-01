/** @jsx React.DOM */
var React = require('react');

var LoadingSpinner = React.createClass({
   render: function() {
        var location = this.props.location;
        console.log("rendering LoadingSpinner ON");
        return (
            <div className="overlay" style={{top: location.top, width: location.outerWidth, height: location.outerHeight}}>
            <img className="img-load" src="../public/spinner.gif" alt="Loading..." style={{top: location.height/2, left: location.width/2}} />
            </div>
        );
   }
});

module.exports = LoadingSpinner;