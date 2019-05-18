import React, { Component } from 'react';
import './styles/App.css';
import Item from './components/Item';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = { 
        items: [
          {
            value: 'Scale Mount Everest',
            priority: 'High',
            completed: false,
          },
          {
            value: 'Pick up dry-cleaning',
            priority: 'Low',
            completed: false,
          },
          {
            value: 'Take a Shower',
            priority: 'Medium',
            completed: true,
          }
        ],
        value: '',
        priority: 'Low',
        completed: false,
        sortNameDirection: null,
        sortPriorityDirection: null,
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleAddItem = this.handleAddItem.bind(this);
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
      this.handleUpdatePriority = this.handleUpdatePriority.bind(this);
      this.handleSortByName = this.handleSortByName.bind(this);
      this.handleSortByPriority = this.handleSortByPriority.bind(this);
  }

  // Handler for input
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  // Add an item to the list
  handleAddItem() {
    if (!this.state.value.length) {
      return;
    }

    const newItem = {
      value: this.state.value,
      priority: 'Low',
      completed: false,
    };

    this.setState(state => ({
      items: state.items.concat(newItem),
      value: '',
      priority: 'Low',
      completed: false,
    }));    
  }

  // Delete an item
  handleDeleteItem(index) {
    this.setState(state => ({
      items: state.items.filter((item, id) => {
        if (id === index) {
          return item.value !== state.items[index].value
        }

        return true;
      })
    }));
  }

  // Prioritise an item
  handleUpdatePriority(event, index) {
    let items = this.state.items;

    this.setState({
      items: items.map((item, id) => {
        if (id === index) {
          return Object.assign({}, item, {
            priority: event.target.value,
          })
        } else {
          return item;
        }
      })
    })
  }

  // Update item status
  handleUpdateStatus(index) {
    let items = this.state.items;

    this.setState({
      items: items.map((item, id) => {
        if (id === index) {
          return Object.assign({}, item, {
            completed: !item.completed,
          })
        } else {
          return item;
        }
      })
    })
  }

  // Sort list by name
  handleSortByName() {
    const items = [...this.state.items].sort((a, b) => {
      if (a.value.toLowerCase() < b.value.toLowerCase()) return -1;
      if (a.value.toLowerCase() > b.value.toLowerCase()) return 1;
      return 0;
    });

    if (this.state.sortNameDirection !== "asc") {
      this.setState({ 
        items: items,
        sortNameDirection: 'asc',
      });

      return;
    }

    this.setState({
      items: items.reverse(),
      sortNameDirection: this.state.sortNameDirection === 'asc' ? 'desc' : 'asc',
    })    
  }

  // Sort list by priority
  handleSortByPriority() {
    let priorityOptions = ["High", "Medium", "Low"]
    let order = (this.state.sortPriorityDirection === 'desc') ? -1 : 1;

    let items = [...this.state.items].sort((a, b) => {
        let p1, p2;
        
        priorityOptions.forEach((row, index) => {
        	if (a.priority === row) p1 = index;
          if(b.priority === row) p2 = index;
        })

        if (p1 < p2) return -1 * order;
        if (p1 > p2) return 1 * order;

        return 0;
    });

    if (this.state.sortPriorityDirection !== "asc") {
      this.setState({
        items: items,
        sortPriorityDirection: 'asc',
      })
      return;
    }

    this.setState({
      items: items,
      sortPriorityDirection: this.state.sortPriorityDirection === 'asc' ? 'desc' : 'asc',
    })
  }

  render() {
      const { items } = this.state;
      console.log(this.state);

      let hasItems = !(!Array.isArray(items) || !items.length);
      let completedItemsCount = items.reduce((n, item) => {
        return n + +(item.completed === true);
      }, 0);
    
      return (
          <div className="App">
              <h1>Todo List</h1>
              <div className="add-task-container">
                <input type="text" placeholder="Start typing to add a task.." onChange={this.handleChange} value={this.state.value}></input>
                <button onClick={this.handleAddItem} className="btn-floating waves-effect waves-light red">
                  <i className="material-icons">add</i>
                </button>
              </div>
              {
                hasItems ?
                <table className="striped">
                  <thead>
                    <tr>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      items.map((item, index) => (
                          <Item key={`items-${index}`}
                                index={index}
                                value={item.value}
                                priority={item.priority}
                                completed={item.completed}
                                updateStatus={() => this.handleUpdateStatus(index)}
                                updatePriority={(e) => this.handleUpdatePriority(e, index)}
                                deleteItem={() => this.handleDeleteItem(index)}
                          />
                      ))
                    }
                  </tbody>
                </table> : <div className="no-items">You have no items</div>               
              }
              <div className="actions-section">
                <button onClick={() => this.handleSortByName()} className="waves-effect waves-light btn-small">Sort by Name</button>
                <button onClick={() => this.handleSortByPriority()} className="waves-effect waves-light btn-small">Sort by Priority</button>
              </div>
              <div className="summary-section">
                <p>Number of Tasks:{this.state.items.length}</p>
                <p>Completed Tasks:{completedItemsCount}</p>
              </div>
          </div>
      );
  }
}

export default App;
