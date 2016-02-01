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
var Projecttime = React.createClass({

	render: function () {
		var a = this.props.startloglist;
		var b = this.props.stoploglist;
		var c = [];
		for (var i = 0; i < a.length; i++) {}
		// var d =(a[i].time - b[i].time,"diff");
		// var elapsed = Math.round(d  / 100);
		//  var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
		//  console.log(parseint(seconds));

		// console.log(c,"newARR");
		// console.log(a,"wow",b,"hi");
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"hi "
			)
		);
	}
});

var Project = React.createClass({

	startTimer: function () {

		var tm = new Date();
		var n = tm.toUTCString();
		this.props.refreshstate1({ id: Date.now(), Name: 'projectstarted', time: n });
		return;
	},
	stopTimer: function () {
		var tm = new Date();
		var n = tm.toUTCString();
		this.props.refreshstate2({ id: Date.now(), Name: 'projectstopped', time: n });
		return;
	},
	render: function () {
		var start = this.props.start;
		var stop = this.props.stop;
		// console.log(start,stop);
		if (start) {
			button = React.createElement(
				"button",
				{ className: "btn btn-success glyphicon glyphicon-time", onClick: this.startTimer },
				"StartTime"
			);
		} else {
			button = React.createElement(
				"button",
				{ className: "btn  btn-danger glyphicon glyphicon-time", onClick: this.stopTimer },
				"StopTime"
			);
		}
		return React.createElement(
			"div",
			{ id: "time-frame" },
			React.createElement(
				"h1",
				null,
				"Track time"
			),
			React.createElement(
				"div",
				{ className: "well" },
				button
			)
		);
	}
});

var Logtime = React.createClass({
	render: function () {
		var res1 = this.props.startloglist;
		var res2 = this.props.stoploglist;
		var results = res1.concat(res2);
		var loglists = results.map(function (result) {
			return React.createElement(
				"div",
				{ className: "border", key: result.id },
				React.createElement(
					"h3",
					null,
					result.Name
				),
				React.createElement(
					"span",
					null,
					result.time
				)
			);
		});
		return React.createElement(
			"div",
			{ id: "log-frame" },
			React.createElement(
				"h1",
				null,
				"Project Log"
			),
			React.createElement("hr", null),
			React.createElement(
				"div",
				{ className: "well" },
				loglists
			)
		);
	}
});
var Main = React.createClass({
	refreshstate1: function (data) {
		var state1 = this.state.startloglist;
		state1.push(data);
		this.setState({ startloglist: state1, start: null, stop: 1 });
	},
	refreshstate2: function (data) {
		var state2 = this.state.stoploglist;
		state2.push(data);
		this.setState({ stoploglist: state2, start: 1, stop: null });
	},
	getInitialState: function () {
		return { startloglist: [], stoploglist: [],
			stop: null, start: 1 };
	},
	render: function () {
		var start = this.state.start;
		var stop = this.state.stop;
		return React.createElement(
			"div",
			{ className: "clearfix" },
			React.createElement(Project, { refreshstate1: this.refreshstate1, refreshstate2: this.refreshstate2, start: start, stop: stop }),
			React.createElement(Logtime, { startloglist: this.state.startloglist, stoploglist: this.state.stoploglist })
		);
	}
});
ReactDOM.render(React.createElement(Nav, null), document.getElementById('container'));
ReactDOM.render(React.createElement(Main, null), document.getElementById('container1'));