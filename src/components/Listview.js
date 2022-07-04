import Task from './Task';
import { COMPLETED_TAB} from '../App';

const ListView = (props) => {
    let i = 0;
  
    const renderTasks = (list) => {
      if (list.length === 1) {
        let classes = 'task';
        if (list[0].location === COMPLETED_TAB) {
          classes = `${classes} completed-text`
        }
        return (<Task classes={classes} key={Math.random(100*1).toString()} task={list[0]} handleTouch={props.handleTouch} index={0}/>)
      }
  
      const taskLists = [];
      const length = list.length
      for (i; i < length; i++) {
        let classes = 'task border-bottom';
        
        if (i === length - 1) {
          classes = 'task';
        }
  
        if (list[i].location === COMPLETED_TAB) {
          classes = `${classes} completed-text`;
        }
  
        const taskElement = (<Task classes={classes} key={i.toString()} task={list[i]} handleTouch={props.handleTouch} index={i}/>)
        taskLists.push(taskElement)
      }
  
      return taskLists;
    }  
    
    return (
      <div className="task-list">
        {
          renderTasks(props.viewData)
        }
      </div>
    )
  }

  export default ListView;