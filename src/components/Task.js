import { TASKS_TAB, COMPLETED_TAB, ALL_TAB } from '../App';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

const Task = (props) => {

    const setIcon = (location) => {
      if (location === COMPLETED_TAB) {
        return (<FaCheckCircle />);
      } else if (location === TASKS_TAB) {
        return (<FaRegCircle />);
      }
    }
  
    return ( 
      <div className={props.classes} onClick={() => props.handleTouch(props.index)}>
        <p className="task-value">{props.task.value}</p>
        <p className="task-icon">{setIcon(props.task.location)}</p>
      </div> 
    )
  }

  export default Task;