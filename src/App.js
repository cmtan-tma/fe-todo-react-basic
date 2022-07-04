import { useState, useEffect } from 'react';
import {FaTasks, FaCheckDouble, FaBusinessTime, FaRocket, FaTelegram, FaCheckCircle, FaRegCircle} from 'react-icons/fa'
import './App.css';

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

const ButtonController = (props) => {
  const tabStr = props.tabType.toLowerCase();
  return (
    <div>                
      <p className='icon-control icon' onClick={() => props.changeTab(props.tabType)}>{props.children}</p>
      <p>{tabStr}</p>
  </div>
  );
}

const TASKS_TAB = 'TASKS';
const COMPLETED_TAB = 'COMPLETED';
const ALL_TAB = 'ALL';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [viewData, setViewData] = useState(taskList);
  const [tab, setTab] = useState(TASKS_TAB);
  const [query, setQuery] = useState('');

  useEffect(() => {
    switch (tab) {
      case TASKS_TAB:
        setViewData(taskList);
        break;
    
        case COMPLETED_TAB:
        setViewData(completed);
        break;
        
      default:
        break;
    }
  }, [taskList, completed])

  const handleAddTask = () => {
    if (query.trim() !== "") {
      const task = {
        value: query,
        location: TASKS_TAB
      }
      setTaskList(taskList.concat(task));
    }

    setQuery('');
  }

  const changeTab = (tab) => {
    switch (tab) {
      case TASKS_TAB:
        setViewData(taskList);
        setTab(TASKS_TAB);
        break;
      case COMPLETED_TAB:
        setViewData(completed);
        setTab(COMPLETED_TAB);
        break;
      case ALL_TAB:
        setViewData(completed.concat(taskList));
        setTab(ALL_TAB);
      default:
        break;
    }
  }

  const handleTouch = (i) => {
    if (tab === ALL_TAB) {
      return;
    }

    const selectedTask = viewData[i];
    let newTaskLists = new Array();
    let newCompletedLists = new Array();

    if (selectedTask.location === TASKS_TAB) {
      selectedTask.location = COMPLETED_TAB;
      newTaskLists = [...taskList.slice(0,i),...taskList.slice(i+1)];
      newCompletedLists = [selectedTask].concat(completed);
    } else if (selectedTask.location === COMPLETED_TAB) {
      selectedTask.location = TASKS_TAB;
      newCompletedLists = [...completed.slice(0,i), ...completed.slice(i+1)];
      newTaskLists = [selectedTask].concat(taskList);
    }

    setCompleted(newCompletedLists);
    setTaskList(newTaskLists);
  }

  return (
    <div className="App">
        <div className="body">
          <div className="header">
            <h1>Todos</h1>
          </div>
          <div>
            <span>{tab} : {viewData.length}</span>
          </div>
          <ListView viewData = {viewData} handleTouch = {(i) => handleTouch(i)}/>
          <div className="input-bar">
              <input 
                type="text"
                placeholder='Enter your task'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
                <FaTelegram onClick={handleAddTask} className='enter-icon icon'/>
          </div>
          <div className="button-control">
              <ButtonController tabType={TASKS_TAB} changeTab={(tabType) => changeTab(tabType)}>
                <FaBusinessTime />
              </ButtonController>
              <ButtonController tabType={COMPLETED_TAB} changeTab={(tabType) => changeTab(tabType)}>
                <FaCheckDouble />
              </ButtonController>
              <ButtonController tabType={ALL_TAB}  changeTab={(tabType) => changeTab(tabType)}>
                <FaTasks />
              </ButtonController>
          </div>
        </div>
    </div>
  );
}

export default App;
