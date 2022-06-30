import {FaTasks, FaCheckDouble, FaBusinessTime, FaChevronCircleUp} from 'react-icons/fa'
import {GrAddCircle} from 'react-icons/gr'
import './App.css';

const App = () => {
  const list = [1,2,3,4,5,6,7,8,9,10,11,12]
  const list2 = [5];
  const createTasks = (list) => {

    if (list.length === 1) {
      return (<div className='task'>Task number 1</div>)
    }

    const taskLists = [];
    const length = list.length
    for (let i = 0; i < length; i++) {
      let classes = 'task border-bottom'
      if (i === length - 1) {
        classes = 'task';
      }
      const taskElement = (<div className={classes} key={i.toString()}>Task number {i}</div>)
      taskLists.push(taskElement)
    }

    return taskLists
  }

  return (
    <div className="App">
        <div className="body">
          <div className="header">
            <h1>Todos</h1>
          </div>
          <div className="task-list">
              {
                createTasks(list)
              }
          </div>
          <div className="input-bar">
              <input 
                type="text"
                placeholder='Enter your task'
                />
                <GrAddCircle className='enter-icon'/>
          </div>
          <div className="button-control">
              <div>                
                <p className='icon'><FaBusinessTime/></p>
                <p>Tasks</p>
              </div>
              <div>
                <p className='icon'><FaCheckDouble /></p>
                <p>Completed</p>
              </div>
              <div>
                <p className='icon'><FaTasks/></p>
                <p>All</p>
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;
