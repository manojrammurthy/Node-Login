var possibleCombinationSum = function (arr, n) {
	if (arr.indexOf(n) >= 0) {
		return true;
	}
	if (arr[0] > n) {
		return false;
	}
	if (arr[arr.length - 1] > n) {
		arr.pop();
		return possibleCombinationSum(arr, n);
	}
	var listSize = arr.length,
	    combinationsCount = 1 << listSize;
	for (var i = 1; i < combinationsCount; i++) {
		var combinationSum = 0;
		for (var j = 0; j < listSize; j++) {
			if (i & 1 << j) {
				combinationSum += arr[j];
			}
		}
		if (n === combinationSum) {
			return true;
		}
	}
	return false;
};

var StarsFrame = React.createClass({
	render: function () {
		//var numberOfStars =Math.floor(Math.random()*9)+1;
		var stars = [];
		for (var i = 0; i < this.props.numberOfStars; i++) {
			stars.push(React.createElement("span", { className: "glyphicon glyphicon-star" }));
		}
		return React.createElement(
			"div",
			{ id: "stars-frame" },
			React.createElement(
				"div",
				{ className: "well" },
				stars
			)
		);
	}
});
var ButtonFrame = React.createClass({
	render: function () {
		var disabled,
		    button,
		    correct = this.props.correct;
		switch (correct) {
			case true:
				button = React.createElement(
					"button",
					{ className: "btn btn-lg btn-success", onClick: this.props.acceptAnswer },
					React.createElement("span", { className: "glyphicon glyphicon-ok" })
				);
				break;
			case false:
				button = React.createElement(
					"button",
					{ className: "btn btn-lg btn-danger" },
					React.createElement("span", { className: "glyphicon glyphicon-remove" })
				);
				break;
			default:
				disabled = this.props.selectedNumbers.length === 0;
				button = React.createElement(
					"button",
					{ className: "btn btn-lg btn-primary", disabled: disabled, onClick: this.props.checkAnswer },
					"="
				);
		}

		return React.createElement(
			"div",
			{ id: "button-frame" },
			button,
			React.createElement("br", null),
			React.createElement(
				"button",
				{ className: "btn btn-warning", onClick: this.props.redraw, disbled: this.props.redraws === 0 },
				React.createElement("span", { className: "glyphicon glyphicon-refresh" }),
				this.props.redraws
			)
		);
	}
});
var AnswerFrame = React.createClass({
	render: function () {
		var props = this.props;
		var selectedNumbers = props.selectedNumbers.map(function (i) {
			return React.createElement(
				"span",
				{ onClick: props.unselectNumber.bind(null, i) },
				i
			);
		});
		return React.createElement(
			"div",
			{ id: "answer-frame" },
			React.createElement(
				"div",
				{ className: "well" },
				selectedNumbers
			)
		);
	}
});

var NumbersFrame = React.createClass({
	render: function () {

		var numbers = [],
		    className,
		    selectNumber = this.props.selectNumber,
		    usedNumbers = this.props.usedNumbers,
		    selectedNumbers = this.props.selectedNumbers;

		for (var i = 1; i <= 9; i++) {
			className = "numbers selected-" + (selectedNumbers.indexOf(i) >= 0);
			className = "numbers used-" + (usedNumbers.indexOf(i) >= 0);
			numbers.push(React.createElement(
				"div",
				{ className: className, onClick: selectNumber.bind(null, i) },
				i
			));
		}

		return React.createElement(
			"div",
			{ id: "number-frame" },
			React.createElement(
				"div",
				{ className: "well" },
				numbers
			)
		);
	}
});
var DoneFrame = React.createClass({
	render: function () {
		return React.createElement(
			"div",
			{ className: "well text-center" },
			React.createElement(
				"h2",
				null,
				this.props.doneStatus
			),
			React.createElement(
				"button",
				{ className: "btn btn-default", onClick: this.props.resetGame },
				"play again"
			)
		);
	}
});

var Game = React.createClass({
	getInitialState: function () {
		return { numberOfStars: this.randomNumber(),
			selectedNumbers: [],
			usedNumbers: [],
			redraws: 5,
			correct: null,
			doneStatus: null };
	},
	resetGame: function () {
		this.replaceState(this.getInitialState());
	},
	randomNumber: function () {
		return Math.floor(Math.random() * 9) + 1;
	},
	selectNumber: function (clickedNumber) {
		if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
			this.setState({ selectedNumbers: this.state.selectedNumbers.concat(clickedNumber), correct: null });
		}
	},
	unselectNumber: function (clickedNumber) {
		var selectedNumbers = this.state.selectedNumbers;
		var indexOfNumber = selectedNumbers.indexOf(clickedNumber);
		selectedNumbers.splice(indexOfNumber, 1);
		this.setState({ selectedNumbers: selectedNumbers, correct: null });
	},
	sumOfSelectedNumbers: function () {
		return this.state.selectedNumbers.reduce(function (p, n) {
			return p + n;
		}, 0);
	},
	checkAnswer: function () {
		var correct = this.state.numberOfStars === this.sumOfSelectedNumbers();
		this.setState({ correct: correct });
	},

	acceptAnswer: function () {
		var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			selectedNumbers: [],
			usedNumbers: usedNumbers,
			correct: null,
			numberOfStars: this.randomNumber()

		}, function () {
			this.updateDoneStatus();
		});
	},
	redraw: function () {
		if (this.state.redraws > 0) {
			this.setState({
				numberOfStars: this.randomNumber(),
				correct: null,
				selectedNumbers: [],
				redraws: this.state.redraws - 1
			}, function () {
				this.updateDoneStatus();
			});
		}
	},
	possibleSolution: function () {
		var numberOfStars = this.state.numberOfStars,
		    possibleNumbers = [],
		    usedNumbers = this.state.usedNumbers;

		for (var i = 1; i <= 9; i++) {
			if (usedNumbers.indexOf(i) < 0) {
				possibleNumbers.push(i);
			}
		}

		return possibleCombinationSum(possibleNumbers, numberOfStars);
	},
	updateDoneStatus: function () {
		if (this.state.usedNumbers.length === 9) {
			this.setState({ doneStatus: 'Done. Nice!' });
			return;
		}
		if (this.state.redraws === 0 && !this.possibleSolution()) {
			this.setState({ doneStatus: 'Game Over!' });
		}
	},
	render: function () {
		var selectedNumbers = this.state.selectedNumbers,
		    numberOfStars = this.state.numberOfStars,
		    usedNumbers = this.state.usedNumbers,
		    redraws = this.state.redraws,
		    doneStatus = this.state.doneStatus,
		    correct = this.state.correct,
		    bottomFrame;
		if (doneStatus) {
			bottomFrame = React.createElement(DoneFrame, { doneStatus: doneStatus, resetGame: this.resetGame });
		} else {
			bottomFrame = React.createElement(NumbersFrame, { selectedNumbers: selectedNumbers, usedNumbers: usedNumbers, selectNumber: this.selectNumber });
		}
		return React.createElement(
			"div",
			{ id: "game" },
			React.createElement(
				"h2",
				null,
				"play Nine"
			),
			React.createElement("hr", null),
			React.createElement(
				"div",
				{ className: "clearfix" },
				React.createElement(StarsFrame, { numberOfStars: numberOfStars }),
				React.createElement(ButtonFrame, { selectedNumbers: selectedNumbers, redraws: redraws, correct: correct, checkAnswer: this.checkAnswer, acceptAnswer: this.acceptAnswer, redraw: this.redraw }),
				React.createElement(AnswerFrame, { selectedNumbers: selectedNumbers, unselectNumber: this.unselectNumber })
			),
			bottomFrame
		);
	}
});

ReactDOM.render(React.createElement(Game, null), document.getElementById('container'));