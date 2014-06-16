/** @jsx React.DOM */
var React = require('react');


/**
 * Defines a specific pagination button, one of: Next, previous, and numbered page.
 */
var PageButton = React.createClass({
    _onClick: function() {
        this.props.action();
    },
    render: function () {
        var pageButton;
        //Next/Previous Buttons
        if (this.props.iconClasses) {
            if (this.props.shouldHaveLink) {
                //Enabled
                pageButton = <li><span className={this.props.iconClasses} onClick={this._onClick}></span></li>;
            } else {
                //Disabled
                pageButton = <li className="disabled"><span className={this.props.iconClasses}></span></li>;
            }
        } else {
            //Number Buttons
            if (this.props.shouldHaveLink) {
                //different page than Current
                pageButton = <li><span onClick={this._onClick}>{this.props.label}</span></li>;
            } else {
                //current page button
                pageButton = <li className="active"><span>{this.props.label}</span></li>;
            }
        }
        return pageButton;
    }
});

module.exports = PageButton;