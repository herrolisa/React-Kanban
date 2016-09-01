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
    let title = this.state.title.trim();
    let priority = this.state.priority.trim();
    let created_by = this.state.created_by.trim();
    let assigned_to = this.state.assigned_to.trim();
    if (!title || !priority || !created_by || !assigned_to) {
      return;
    }
    this.props.onTaskSubmit({title: title, priority: priority, created_by: created_by, assigned_to: assigned_to});
    this.setState({title: '', priority: '', created_by: '', assigned_to: ''});
  },
  render: function () {
    const currentUsers = this.props.users.map((eachUser) => {
      return (
        <option value={eachUser.username} key={eachUser.id}>{eachUser.username}</option>
      )
    });
    return (
      <div className="form-container">
        <h2>Add A Task</h2>
        <form className="taskForm" onSubmit={this.handleSubmit}>
          <p>
            <label>Title<br />
              <input type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange} />
            </label>
          </p>
          <p>
            <label>Priority (Low: 1 - High: 10)<br />
              <input type="number" min="1" max="10" placeholder="0" value={this.state.priority} onChange={this.handlePriorityChange} />
            </label>
          </p>
          <p>
            <label>Created By<br />
              <select type="text" placeholder="Created By" value={this.state.created_by} onChange={this.handleCreatorChange}>
                <option defaultValue disabled>Select User</option>
                {currentUsers}
              </select>
            </label>
          </p>
          <p>
            <label>Assigned To<br />
              <select type="text" placeholder="Assigned To" value={this.state.assigned_to} onChange={this.handleAssignerChange}>
                <option defaultValue disabled>Select User</option>
                {currentUsers}
              </select>
            </label>
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
    let statusButtons = null;
    switch (this.props.status){
      case 1:
        statusButtons =
          <div className="update-status">
            <input type="hidden" name="_method" value="PUT" />
            <input type="submit" value=">>" onClick={ (e) => this.props.update(this.props.id, this.props.status + 1) } />
          </div>;
        break;
      case 2:
        statusButtons =
          <div className="update-status">
            <input type="hidden" name="_method" value="PUT" />
            <input type="submit" value="<<" onClick={ (e) => this.props.update(this.props.id, this.props.status - 1) } />
            <input type="hidden" name="_method" value="PUT" />
            <input type="submit" value=">>" onClick={ (e) => this.props.update(this.props.id, this.props.status + 1) } />
          </div>
        break;
      case 3:
        statusButtons =
          <div className="update-status">
            <input type="hidden" name="_method" value="PUT" />
            <input type="submit" value="<<" onClick={ (e) => this.props.update(this.props.id, this.props.status - 1) } />
          </div>;
        break;
    }
    return (
      <div className="task-card">
        <div className="delete-task">
          <input type="hidden" name="_method" value="DELETE" />
          <input type="submit" value="X" onClick={ (e) => this.props.delete(this.props.id) } />
        </div>
        <div className ="task-info">
          <div className="task-header">
            <p className="task-title">{this.props.title}</p>
          </div>
          <div className="task-body">
            <p className="task-priority">Priority: {this.props.priority}</p>
            <p className="task-creator"><span>Created By:</span><br/>{this.props.created_by}</p>
            <p className="task-assigner"><span>Assigned To:</span><br/>{this.props.assigned_to}</p>
          </div>
        </div>
        {statusButtons}
      </div>
    );
  }
});

const TaskList = React.createClass({
  render: function () {
    let tasks = this.props.data.map((singleTask) => {
      if (singleTask.status_id === this.props.status){
        return (
          <TaskCard
            title={singleTask.title}
            priority={singleTask.priority}
            created_by={singleTask.created_by}
            assigned_to={singleTask.assigned_to}
            status={singleTask.status_id}
            key={singleTask.id}
            id={singleTask.id}
            delete={this.props.onTaskDelete}
            update={this.props.onStatusUpdate}
          />
        );
      }
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
    return {
      data: [],
      users: []
    };
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
  loadUsersFromServer: function() {
    $.ajax({
      url: '/api/users',
      dataType: 'json',
      cache: false,
      success: function(users) {
        this.setState({users: users});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/users', status, err.toString());
      }.bind(this)
    });
  },
  handleTaskSubmit: function(task) {
    let currentTasks = this.state.data;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: task,
      success: function(data) {
        let newTasks = currentTasks.concat([data]);
        this.setState({data: newTasks});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: tasks});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDeleteTask: function (id) {
    $.ajax({
      url: this.props.url + '/' + id,
      type: 'DELETE',
      success: (data) => {
        this.setState({data: data});
      }
    });
  },
  handleStatusUpdate: function (id, newStatus) {
    $.ajax({
      url: this.props.url + '/' + id,
      dataType: 'json',
      type: 'PUT',
      data: {status_id: newStatus},
      success: (updatedTasks) => {
        this.setState({data: updatedTasks})
      }
    });
  },
  componentDidMount: function() {
    this.loadTasksFromServer();
    this.loadUsersFromServer();
    setInterval(this.loadTasksFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="kanban-container">
        <h1>Kanban Board</h1>
        <div className="status-columns">
          <div className="column">
            <h2>Queue</h2>
            <TaskList status={1} data={this.state.data} onTaskDelete={this.handleDeleteTask} onStatusUpdate={this.handleStatusUpdate} />
          </div>
          <div className="column">
            <h2>In Progress</h2>
            <TaskList status={2} data={this.state.data} onTaskDelete={this.handleDeleteTask} onStatusUpdate={this.handleStatusUpdate} />
          </div>
          <div className="column">
            <h2>Done</h2>
            <TaskList status={3} data={this.state.data} onTaskDelete={this.handleDeleteTask} onStatusUpdate={this.handleStatusUpdate} />
          </div>
        </div>
        <TaskForm users={this.state.users} onTaskSubmit={this.handleTaskSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <KanbanBox url="/api/tasks" pollInterval={10000} />,
  document.getElementById("container")
);