/** @jsx React.DOM */
var React = require('react');
var Modal = require('./Modal.react');

var ModalTrigger = React.createClass({
    handleClick: function(e) {
        console.log("ModalTrigger handleClick modal()");
        $(this.refs.modal.getDOMNode()).modal();
    },
    render: function() {
        var trigger = this.props.trigger;
        return (
            <span onClick={this.handleClick}>
            {trigger}
            <Modal ref="modal"
                header={this.props.header}
                body={this.props.body}
                footer={this.props.footer}>
            </Modal>
            </span>
        );
    }
});

module.exports = ModalTrigger;