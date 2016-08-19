// -KanbanBox
//   -TaskList
//     -TaskCard
//   -TaskForm

const TaskForm = React.createClass({
  getInitialState: function() {
    return {title: '', priority: '', created_by: '', assigned_to: ''};
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handlePriorityChange: function(e) {
    this.setState({priority: e.target.value});
  },
  handleCreatorChange: function(e) {
    this.setState({created_by: e.target.value});
  },
  handleAssignerChange: function(e) {
    this.setState({assigned_to: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var priority = this.state.priority.trim();
    var created_by = this.state.created_by.trim();
    var assigned_to = this.state.assigned_to.trim();
    if (!title || !priority || !created_by || !assigned_to) {
      return;
    }
    this.props.onTaskSubmit({title: title, priority: priority, created_by: created_by, assigned_to: assigned_to});
    this.setState({title: '', priority: '', created_by: '', assigned_to: ''});
  },
  render: function () {
    return (
      <div className="form-container">
        <form className="taskForm" onSubmit={this.handleSubmit}>
          <p>
            <label for="title">Title</label><br />
            <input type="text" id="title" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange} />
          </p>
          <p>
            <label for="priority">Priority (Low: 1 - High: 10)</label><br />
            <input type="number" id="priority" min="1" max="10" placeholder="0" value={this.state.priority} onChange={this.handlePriorityChange} />
          </p>
          <p>
            <label for="creator">Created By</label><br />
            <input type="text" id="creator" placeholder="Created By" value={this.state.created_by} onChange={this.handleCreatorChange} />
          </p>
          <p>
            <label for="assigner">Assigned To</label><br />
            <input type="text" id="assigner" placeholder="Assigned To" value={this.state.assigned_to} onChange={this.handleAssignerChange} /><br />
          </p>
          <p className="form-submit">
            <input type="submit" value="Add New Task" />
          </p>
        </form>
      </div>
    );
  }
});

const TaskCard = React.createClass({
  render: function() {
    return (
      <div className="task-card">
        <ul>
          <li>Title: {this.props.title}</li>
          <li>Priority: {this.props.priority}</li>
          <li>Created By: {this.props.created_by}</li>
          <li>Assigned To: {this.props.assigned_to}</li>
        </ul>
      </div>
    );
  }
});

const TaskList = React.createClass({
  render: function () {
    var tasks = this.props.data.map(function(singleTask) {
      return (
        <TaskCard
          title={singleTask.title}
          priority={singleTask.priority}
          created_by={singleTask.created_by}
          assigned_to={singleTask.assigned_to}
          key={singleTask.id}
        />
      );
    });
    return (
      <div className="task-list">
        { tasks }
      </div>
    );
  }
});

const KanbanBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadTasksFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTaskSubmit: function(task) {
    var currentTasks = this.state.data;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: task,
      success: function(data) {
        var newTasks = currentTasks.concat([data]);
        this.setState({data: newTasks});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: tasks});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadTasksFromServer();
    setInterval(this.loadTasksFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="kanban-container">
        <h1>Kanban Box</h1>
        <div className="status-columns">
          <div className="column">
            <h2>Queue</h2>
            <TaskList data={this.state.data} />
          </div>
          <div className="column">
            <h2>In Progress</h2>
          </div>
          <div className="column">
            <h2>Done</h2>
          </div>
        </div>
        <TaskForm onTaskSubmit={this.handleTaskSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <KanbanBox url="/api/tasks" pollInterval={10000} />,
  document.getElementById("container")
);