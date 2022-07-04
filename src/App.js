import { useState, useEffect } from 'react';
import {FaTasks, FaCheckDouble, FaBusinessTime,FaTelegram, FaCheckCircle, FaRegCircle} from 'react-icons/fa'
import './App.css';
import ListView from './components/Listview';
import ButtonController from './components/ButtonController';

export const TASKS_TAB = 'TASKS';
export const COMPLETED_TAB = 'COMPLETED';
export const ALL_TAB = 'ALL';

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
            <span className="tab-info">{tab} : {viewData.length}</span>
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
