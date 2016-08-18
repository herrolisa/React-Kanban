// -KanbanBox
//   -Column
//     -Card
//     -CardForm

const TaskForm = React.createClass({
  render: function () {
    return (
      <form className="taskForm" onSubmit={this.handleSubmit} >
        <input type="text" placeholder="Title" /><br />
        <input type="text" placeholder="Priority" /><br />
        <input type="text" placeholder="Created By" /><br />
        <input type="text" placeholder="Assigned To" /><br />
        <input type="submit" value="Add New Task" />
      </form>
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


const Column = React.createClass({
  render: function() {
    return (
      <div className="column">
        <h2>Things To Do</h2>
        <TaskList data={this.props.data} />
        <TaskForm />
      </div>
    );
  }
});

const KanbanBox = React.createClass({
 render: function () {
    return (
      <div className='kanban-container'>
        <h1>Kanban Box</h1>
        <Column data={this.props.data} />
      </div>
    );
  }
});

var sample = [
  {"id":2,"title":"Sales Report","priority":50,"created_by":"Manager","assigned_to":"Intern","createdAt":"2016-08-17T23:47:29.372Z","updatedAt":"2016-08-17T23:47:29.372Z"},
  {"id":3,"title":"Expense Report","priority":50,"created_by":"Manager","assigned_to":"Intern","createdAt":"2016-08-17T23:47:29.372Z","updatedAt":"2016-08-17T23:47:29.372Z"}];

ReactDOM.render(
  <KanbanBox data={sample} />,
  document.getElementById('container')
);