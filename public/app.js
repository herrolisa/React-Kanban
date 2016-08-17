const CardForm = React.createClass({
  render: function () {
    return (
      <form className="cardForm" onSubmit={this.handleSubmit} >
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Priority" />
        <input type="text" placeholder="Created By" />
        <input type="text" placeholder="Assigned To" />
        <input type="submit" value="Add New Task" />
      </form>
    );
  }
});

const Card = React.createClass({
  render: function() {
    return (
      <div className="task-card">
        <ul>
          <li>Title:</li>
          <li>Priority:</li>
          <li>Created By:</li>
          <li>Assigned To:</li>
        </ul>
      </div>
    );
  }
});

const Column = React.createClass({
  render: function() {
    return (
      <div className="column">
        <h2>{this.props.status}</h2>
        <Card />
        <CardForm />
      </div>
    );
  }
});

const KanbanBox = React.createClass({
 render: function () {
    const statusColumns = this.props.data.map(function (element, index) {
        return (
          <Column key={index} status={element.status} />
        )
    })
    return (
      <div className='kanban-container'>
        <h1>Kanban Box</h1>
        {statusColumns}
      </div>
    );
  }
});

var statusArr = [{status: 'Queue'}, {status: 'In Progress'}, {status: 'Done'}]

ReactDOM.render(
  <KanbanBox data={statusArr} />,
  document.getElementById('container')
);