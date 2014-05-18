var React = require('react');


/**
 * Defines a specific pagination button, one of: Next, previous, and numbered page.
 */
var PageButton = React.createClass({
    render: function () {
        var pageButton;
        //Next/Previous Buttons
        if (this.props.iconClasses) {
            if (this.props.updatePageCallback) {
                //Enabled
                pageButton = <li><span className={this.props.iconClasses} onClick={this.props.updatePageCallback.bind(null, this.props.pageNumber, null)}></span></li>;
            } else {
                //Disabled
                pageButton = <li className="disabled"><span className={this.props.iconClasses}></span></li>;
            }
        } else {
            //Number Buttons
            if (this.props.updatePageCallback) {
                //different page than Current
                pageButton = <li><span onClick={this.props.updatePageCallback.bind(null, this.props.pageNumber, null)}>{this.props.label}</span></li>;
            } else {
                //current page button
                pageButton = <li className="active"><span>{this.props.label}</span></li>;
            }
        }
        return pageButton;
    }
});

module.exports = PageButton;