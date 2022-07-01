import { useState, useEffect } from 'react';
import {FaTasks, FaCheckDouble, FaBusinessTime, FaRocket, FaTelegram, FaCheckCircle, FaRegCircle} from 'react-icons/fa'
import './App.css';

const Task = (props) => {
  return ( 
    <div className={props.classes} onClick={() => props.handleTouch(props.index)}>
      <p className="task-value">{props.content}</p>
      <p className="task-icon"><FaRegCircle /></p>
    </div> 
  )
}

const ListView = (props) => {
  const renderTasks = (list) => {
    if (list.length === 1) {
      return (<Task classes='task' key={Math.random(100*1).toString()} content={list[0].value} handleTouch={props.handleTouch} index={1}/>)
    }

    const taskLists = [];
    const length = list.length
    for (let i = 0; i < length; i++) {
      let classes = 'task border-bottom';
      
      if (i === length - 1) {
        classes = 'task';
      }

      const taskElement = (<Task classes={classes} key={i.toString()} content={list[i].value} handleTouch={props.handleTouch} index={i}/>)
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
    const value = viewData[i].value;
    const location = viewData[i].location;

    if (location === TASKS_TAB) {
      // const completeTask = {
      //   value
      // }
    }
    
    console.log(`Click on a task ${i} : ${viewData[i].value} - ${viewData[i].location}`)
  }



  return (
    <div className="App">
        <div className="body">
          <div className="header">
            <h1>Todos</h1>
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
              <div>                
                <p className='icon-control icon' onClick={() => changeTab(TASKS_TAB)}><FaBusinessTime /></p>
                <p>Tasks</p>
              </div>
              <div>
                <p className='icon-control icon' onClick={() => changeTab(COMPLETED_TAB)}><FaCheckDouble /></p>
                <p>Completed</p>
              </div>
              <div>
                <p className='icon-control icon' onClick={() => changeTab(ALL_TAB)}><FaTasks /></p>
                <p>All</p>
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;
