import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faPen,
  faTasks,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
function App() {
 const[toDo,setTodo] = useState([
  
 ])

 const[newTask,setNewTask] = useState('');
 const[updateData,setUpdateData] = useState('');

const addTask=() =>{
     if(newTask){
      let num=toDo.length+1;
      let newE ={id:num,title:newTask,status:false};
      
      setTodo([...toDo,newE]);
      setNewTask('');
     }
} 

const deleteTask=(id)=>{
 let newTasks=toDo.filter(task=>task.id!==id);
   setTodo(newTasks);
}
 const markDone=(id)=>{
  let newTask=toDo.map(task=>{
    if(task.id===id){
      return({...task,status:!task.status})
    }
    return task;
  })
  setTodo(newTask);
 }

const cancelUpdate=()=>{
  setUpdateData('');
}
const changeTask=(e)=>{
  let newEntry={
    id:updateData.id,
    title:e.target.value,
    status:updateData.status
  }
  setUpdateData(newEntry);

}

const updateTask=()=>{
  let filterRecord=[...toDo].filter(task=>task.id!==updateData.id);
  let updateObject =[...filterRecord,updateData]
  setTodo(updateObject);
  setUpdateData('');
}


   return (
    <div className="container App">
    <br></br>
    <h2>To Do List App</h2>
    <br></br> 
    {updateData && updateData?(
<>
  <div className="row">
  <div className="col">
    <input 
    className="form-control  form-control-lg"
      value={updateData&&updateData.title}
      onChange={(e)=>changeTask(e)}
    />
  </div>
  <div className="col-auto">
  <button 
  onClick ={updateTask}
  className="btn btn-lg btn-success mr-20">
    Update
  </button>
  <button 
  onClick={cancelUpdate}
  className="btn btn-lg btn-warning">
   Cancel
  </button>
  </div>
</div>
<br  />
</>
   ):(
  <>
  <div className="row">
   <div className="col">
     <input 
     value={newTask}
     onChange={(e)=>setNewTask(e.target.value)}
     className="form-control  form-control-lg"/>
   </div>
   <div className="col-auto">
   <button
   onClick={addTask}
   className="btn btn-lg btn-success">
     Add Task
   </button>
   </div>
 </div>
 <br />
</>
)}
    


   <h4>
    {toDo&&toDo.length?'':
    'No tasks to be done! Yay 🥳'}
    </h4>
    {toDo &&toDo 
    .sort((a,b)=>a.id>b.id?1:-1)
    .map ((task ,index)=>{
      return (
        <div>
        <div className="col taskBg">
        <div className={task.status?'done':''}>
          <span className="taskNumber">{index+1}</span>
          <span className="taskText">{task.title}</span>
          </div>
          <div className="iconsWrap">
            <span 
            onClick={(e)=>markDone(task.id)}
            title="Done✅/Not yet Done👎">
             < FontAwesomeIcon icon ={faCircleCheck}/></span>
             {
              task.status?null:(
                <span title="Edit"
                onClick={()=>{setUpdateData({
                  id: task.id,
                 title: task.title,
                  status: task.status
                })
                 
                }}
                >
            < FontAwesomeIcon icon ={faPen}/>   
            </span>
              )
             }
            
            <span title="Remove"
            onClick={()=>deleteTask(task.id)}>
            < FontAwesomeIcon icon ={faTrashCan}/>   
            </span>
          </div>
        </div>
        </div>
        
      )
    }

    )
    
    }
    </div>
  );
}

export default App;
