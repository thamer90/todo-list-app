import React from 'react';
import PropTypes from 'prop-types';

const Item = (props, index) => {
    const priorityOptions = ['Low', 'Medium', 'High'];

    let status = props.completed ? 'Completed' : 'Pending';
    let statusButton = props.completed?
        <button onClick={props.updateStatus} className="waves-effect waves-light btn-small red"><i className="material-icons">close</i></button>
        : <button onClick={props.updateStatus} className="waves-effect waves-light btn-small green"><i className="material-icons">check</i></button>;

    return (
        <tr index={index} className="item">
            <td>{props.value}</td>
            <td>{props.priority}</td>
            <td>{status}</td>
            <td>
                <select value={props.priority} onChange={props.updatePriority}>
                    {
                        priorityOptions.map((option, index) => (
                            <option 
                                key={`priority-${index}`}
                                value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>             
            </td>
            <td>
                {statusButton}
                <button onClick={props.deleteItem} className="waves-effect waves-light btn-small grey"><i className="material-icons">delete</i></button>               
            </td>
        </tr>
    );
}

Item.propTypes = {
    value: PropTypes.string,
    priority: PropTypes.string,
    completed: PropTypes.bool,
    updateStatus: PropTypes.func.isRequired,
    updatePriority: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
};

Item.defaultProps = {
    value: '',
    priority: 'Low',
    completed: false,
};

export default Item;