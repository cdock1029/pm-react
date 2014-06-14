/** @jsx React.DOM */
var React = require('react');

var Modal = React.createClass({
    componentDidMount: function() {
        // Initialize the modal, once we have the DOM node
        // TODO: Pass these in via props
        //console.log("Modal componentDidMount modal(..)");
        //$(this.getDOMNode()).modal({background: true, keyboard: true, show: false});
    },
    componentWillUnmount: function() {
        $(this.getDOMNode()).off('hidden');
    },
    // This was the key fix --- stop events from bubbling
    handleClick: function(e) {
        e.stopPropagation();
    },
    render: function() {
        return (
            <div onClick={this.handleClick} className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {this.props.header}
                        {this.props.body}
                        {this.props.footer}
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Modal;