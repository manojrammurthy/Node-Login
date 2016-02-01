var React = require('react');
var Bootstrap = require('react-bootstrap');

var HelloMessage = React.createClass({
  render: function() {
    return (
    	<div className="jumbotron">

    	<h1>how are u</h1>
    	<button className="btn btn-primary">wow</button>
    </div>);
  }
});




module.exports = HelloMessage;