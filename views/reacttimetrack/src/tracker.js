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


var Projectform = React.createClass({
	handleSubmit:function(e){
		e.preventDefault();
		var Name = this.refs.name.value.trim(),
		projectName=this.refs.projectName.value.trim(),
		projectManager=this.refs.pm.value.trim();
		if(!projectName || !Name || !projectManager){
            return;
          }
		this.props.refreshstate({id: Date.now(),Name: Name,projectname: projectName,});
		
          this.refs.name.value='';
          this.refs.projectName.value='';
          this.refs.pm.value='';
          return;        
	},
	render:function(){

		return (
				<div id="project-form">
				<h3>InviteFor Project</h3>
				<hr />
				<div className="well">
					<form className="form-Horizontal" onSubmit={this.handleSubmit}>
				  		<div className="form-group">
				    <label >Name</label>
				    <input className="form-control" placeholder="Name" ref="name"/>
				  </div>
				  <div className="form-group">
				    <label >ProjectName</label>
				    <input type="text" className="form-control"  placeholder="projectname" ref="projectName"/>
				  </div>
				   <div className="form-group">
				    <label >ProjectManagerName</label>
				    <input type="text" className="form-control"  placeholder="projectManager" ref="pm"/>
				  </div>
				  <button type="submit" className="btn btn-default">Send invitation</button>
				</form>
				</div>
					</div>
				);
	}
});
var Listproject = React.createClass({
		render:function(){
		var results = this.props.projectlist;
		
		var projectlist= results.map(function(result) {
			
         	return (<tr key={result.id}>
         			<td >
         				{result.Name}
                    </td>
                    <td >
         				{result.projectname}
         				<a href="pm.html" className="btn btn-info" role="button" >GotoProject</a>
                    </td>
                   
                    </tr>);
        });
					
		return (<div id="project-list">
				<h3>Hello I am project list </h3>
				<hr />
				<div className="well">
				<table className="table table-fixed">
				    <thead>
				      <tr>
				        <th>author</th>
				        <th>ProjectName</th>

				       </tr>
				    </thead>
				    <tbody>
				      	{projectlist}

				     </tbody>
				</table>
				</div>
				</div>);
	}

});


var Main = React.createClass({
	refreshstate:function(data){
		var state1 =this.state.projectlist;
		state1.push(data);
		this.setState({projectlist: state1});
	},
	
	getInitialState:function(){
		return { projectlist:[{id: Date.now(),Name: "manoj",projectname:"kumar",}]};
		 
	},
	render:function(){
		return (<div className="clearfix">
					<Projectform refreshstate={this.refreshstate}/>
					<Listproject projectlist={this.state.projectlist} />
					</div>);
	}
});

ReactDOM.render(<Nav />,document.getElementById('container'));
ReactDOM.render(<Main />,document.getElementById('container1'));