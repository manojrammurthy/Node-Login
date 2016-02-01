var Nav =React.createClass({
	render:function(){
		return (
						<nav role="navigation" >
							<ul >
								<li><a href="tracker.html">Home</a></li>
								<li ><a href="#">About</a></li>
								<li ><a href="#">MyAcount</a></li>
								<li ><a href="#">Contact</a></li>
							</ul>
						</nav>
				);
	}
});
var Projecttime =React.createClass({

		render:function(){
			var a = this.props.startloglist;
			var b =this.props.stoploglist;
			var c=[];
			for(var i=0; i<a.length; i++){
				// var d =(a[i].time - b[i].time,"diff");
				// var elapsed = Math.round(d  / 100);
				//  var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
				//  console.log(parseint(seconds));
				
			}
			// console.log(c,"newARR");
		// console.log(a,"wow",b,"hi");
			return (<div>
				<h1>hi </h1>
				</div>);
		}
});

var Project = React.createClass({

	startTimer:function(){

		var tm =new Date();
		var n = tm.toUTCString();
		this.props.refreshstate1({id: Date.now(),Name: 'projectstarted',time: n,});
		return;
	},
	stopTimer:function(){
		var tm =new Date();
		 var n = tm.toUTCString();
		this.props.refreshstate2({id: Date.now(),Name: 'projectstopped',time: n,});
		return;
	},
		render:function(){
				var start = this.props.start;
				var stop=this.props.stop;
				// console.log(start,stop);
				if(start){
					button=<button  className="btn btn-success glyphicon glyphicon-time" onClick={this.startTimer}>StartTime</button>;
				}
				else{
					button=<button  className="btn  btn-danger glyphicon glyphicon-time" onClick={this.stopTimer}>StopTime</button>;
				}
			return (<div id="time-frame">
				<h1>Track time</h1>
						<div className="well">
							{button}
						</div>

				</div>);
		}
});

var Logtime = React.createClass({
	render:function(){
		var res1 = this.props.startloglist;
		var res2=this.props.stoploglist;
		var results = res1.concat(res2);
		var loglists= results.map(function(result) {
			return (<div className="border"key={result.id}>
         			<h3>
         				{result.Name}
                    </h3>
                    <span>
         				{result.time}
         			</span>
                    </div>);
		});
		return (<div id="log-frame">
					
					<h1>Project Log</h1>
					<hr />
					<div className="well">
					
					{loglists}

					</div>
					
				</div>);
	}
});
var Main = React.createClass({
	refreshstate1:function(data){
		var state1 =this.state.startloglist;
		state1.push(data);
		this.setState({startloglist: state1,start:null,stop:1});
	},
	refreshstate2:function(data){
		var state2 =this.state.stoploglist;
		state2.push(data);
		this.setState({stoploglist: state2,start:1,stop:null});
	},
	getInitialState:function(){
		return { startloglist:[],stoploglist:[],
				stop:null,start:1};
		
	},
	render:function(){
		var start = this.state.start;
		var stop =this.state.stop;
		return (<div className="clearfix">
					<Project refreshstate1={this.refreshstate1} refreshstate2={this.refreshstate2} start={start} stop={stop}/>
					<Logtime  startloglist={this.state.startloglist} stoploglist={this.state.stoploglist}/>
					
					</div>);
	}
});
ReactDOM.render(<Nav />,document.getElementById('container'));
ReactDOM.render(<Main />,document.getElementById('container1'));
