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
						{ href: "tracker.html" },
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

var Projectform = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var Name = this.refs.name.value.trim(),
		    projectName = this.refs.projectName.value.trim(),
		    projectManager = this.refs.pm.value.trim();
		if (!projectName || !Name || !projectManager) {
			return;
		}
		this.props.refreshstate({ id: Date.now(), Name: Name, projectname: projectName });

		this.refs.name.value = '';
		this.refs.projectName.value = '';
		this.refs.pm.value = '';
		return;
	},
	render: function () {

		return React.createElement(
			"div",
			{ id: "project-form" },
			React.createElement(
				"h3",
				null,
				"InviteFor Project"
			),
			React.createElement("hr", null),
			React.createElement(
				"div",
				{ className: "well" },
				React.createElement(
					"form",
					{ className: "form-Horizontal", onSubmit: this.handleSubmit },
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"label",
							null,
							"Name"
						),
						React.createElement("input", { className: "form-control", placeholder: "Name", ref: "name" })
					),
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"label",
							null,
							"ProjectName"
						),
						React.createElement("input", { type: "text", className: "form-control", placeholder: "projectname", ref: "projectName" })
					),
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"label",
							null,
							"ProjectManagerName"
						),
						React.createElement("input", { type: "text", className: "form-control", placeholder: "projectManager", ref: "pm" })
					),
					React.createElement(
						"button",
						{ type: "submit", className: "btn btn-default" },
						"Send invitation"
					)
				)
			)
		);
	}
});
var Listproject = React.createClass({
	render: function () {
		var results = this.props.projectlist;

		var projectlist = results.map(function (result) {

			return React.createElement(
				"tr",
				{ key: result.id },
				React.createElement(
					"td",
					null,
					result.Name
				),
				React.createElement(
					"td",
					null,
					result.projectname,
					React.createElement(
						"a",
						{ href: "pm.html", className: "btn btn-info", role: "button" },
						"GotoProject"
					)
				)
			);
		});

		return React.createElement(
			"div",
			{ id: "project-list" },
			React.createElement(
				"h3",
				null,
				"Hello I am project list "
			),
			React.createElement("hr", null),
			React.createElement(
				"div",
				{ className: "well" },
				React.createElement(
					"table",
					{ className: "table table-fixed" },
					React.createElement(
						"thead",
						null,
						React.createElement(
							"tr",
							null,
							React.createElement(
								"th",
								null,
								"author"
							),
							React.createElement(
								"th",
								null,
								"ProjectName"
							)
						)
					),
					React.createElement(
						"tbody",
						null,
						projectlist
					)
				)
			)
		);
	}

});

var Main = React.createClass({
	refreshstate: function (data) {
		var state1 = this.state.projectlist;
		state1.push(data);
		this.setState({ projectlist: state1 });
	},

	getInitialState: function () {
		return { projectlist: [{ id: Date.now(), Name: "manoj", projectname: "kumar" }] };
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "clearfix" },
			React.createElement(Projectform, { refreshstate: this.refreshstate }),
			React.createElement(Listproject, { projectlist: this.state.projectlist })
		);
	}
});

ReactDOM.render(React.createElement(Nav, null), document.getElementById('container'));
ReactDOM.render(React.createElement(Main, null), document.getElementById('container1'));