var Nav = React.createClass({
	render: function () {
		return React.createElement(
			"nav",
			{ role: "navigation" },
			React.createElement(
				"ul",
				null,
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#" },
						"Home"
					)
				),
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#" },
						"About"
					)
				),
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#" },
						"MyAcount"
					)
				),
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#" },
						"Contact"
					)
				)
			)
		);
	}

});
ReactDOM.render(React.createElement(Nav, null), document.getElementById('example'));

var contacts = [{ key: 1, name: "James Nelson", email: "james@jamesknelson.com" }, { key: 2, name: "Bob", email: "bob@gmail.com" }];

var newcontact = { name: "", email: "" };

var ContactForm = React.createClass({
	propTypes: {
		contact: React.PropTypes.object.isRequired
	},
	render: function () {
		return React.createElement(
			"form",
			null,
			React.createElement("input", { type: "text", placeholder: "Name (required)", value: this.props.name }),
			React.createElement("input", { type: "email", placeholder: "email", value: this.props.email }),
			React.createElement(
				"button",
				{ type: "submit" },
				"ADD"
			)
		);
	}
});

var listElements = contacts.filter(function (contact) {
	return contact.email;
}).map(function (contact) {
	var options = React.createElement(
		"li",
		null,
		React.createElement(
			"h2",
			null,
			contact.name
		),
		React.createElement(
			"a",
			{ href: "#" },
			contact.email
		)
	);
	return options;
});

var App = React.createClass({
	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Contacts"
			),
			React.createElement(
				"ul",
				null,
				listElements
			)
		);
	}
});
ReactDOM.render(React.createElement(App, null), document.getElementById('example1'));
ReactDOM.render(React.createElement(ContactForm, { contact: newcontact }), document.getElementById('example2'));