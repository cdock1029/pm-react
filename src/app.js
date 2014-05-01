/** @jsx React.DOM */
var BuildingTable = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <div class="page-header">
          <h1>Buildings</h1>
        </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                    </tr>
                </thead>
                <tbody>
                {{#each model}}
                    <tr>
                        <td>{{#link-to 'building' this}}{{name}}{{/link-to}}</td>
                        <td>{{address}}</td>
                        <td>{{city}}</td>
                        <td>{{state}}</td>
                        <td>{{zip}}</td>
                    </tr>
                {{/each}}
                </tbody>
            </table>
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
          I am a comment list.
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a comment form.
      </div>
    );
  }
});

React.renderComponent(
  <CommentBox />,
  document.getElementById('content')
);
