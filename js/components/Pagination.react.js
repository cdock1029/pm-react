/** @jsx React.DOM */
var React = require('react');
var PageButton = require('./PageButton.react');

/**
 * Encapsulates all pagination buttons for a data table.
 */
var Pagination = React.createClass({
    render: function () {
        var pageNumberButtons = [];
        for (var i = 1; i <= this.props.numberOfPages; i++) {
            var button;
            if (this.props.currentPage === i) {
                //don't add the callback to "current page" button. We're on it already
                button = <PageButton pageNumber={i} label={i} key={i} action={this.props.action} />;
            } else {
                button = <PageButton pageNumber={i} label={i} shouldHaveLink={true} key={i} action={this.props.action} />;
            }
            pageNumberButtons.push(button);
        }
        var nextButton, previousButton;
        //We're on the LAST page, disable "next"
        if (this.props.currentPage === this.props.numberOfPages) {
            nextButton = <PageButton iconClasses={'glyphicon glyphicon-chevron-right'} action={this.props.action} />;
        } else {
            nextButton = <PageButton iconClasses={'glyphicon glyphicon-chevron-right'} shouldHaveLink={true} pageNumber={this.props.currentPage + 1} action={this.props.action} />;
        }
        //We're on the FIRST page, disable "previous"
        if (this.props.currentPage === 1) {
            previousButton = <PageButton iconClasses={'glyphicon glyphicon-chevron-left'} />;
        } else {
            previousButton = <PageButton iconClasses={'glyphicon glyphicon-chevron-left'} shouldHaveLink={true} pageNumber={this.props.currentPage - 1} action={this.props.action}/>;
        }
        return (
            <ul className="pagination">
                {previousButton}
                {pageNumberButtons}
                {nextButton}
            </ul>
        );
    }
});

module.exports = Pagination;