document.addEventListener('DOMContentLoaded',()=>{
    const addtask = document.getElementById("add-task-btn")
    const todolist = document.getElementById("todo-list")
    const todoinput = document.getElementById("todo-input")
// grabbed the element where we want to work

    let tasks= JSON.parse(localStorage.getItem('tasks')) || [] //first we created an empty array to store the tasks  
// to siplay task   
    tasks.forEach(task =>render(task));
// as soon as page loads we will load the tasks from local storage and store that in tasks array and after that we will call render in a loop to pass it on task 1 by 1 and display the tasks 

// to add a task we wil take addtask and add a eventlistner to it
    addtask.addEventListener('click',()=>{
        
        const tasktext = todoinput.value.trim(); //grabbing the input value
        if(tasktext==="") return; //if empty it will return
// making an object to assign a unique id and status of completion to tha task
        const newtask={
            id: Date.now(),
            text: tasktext,
            completed: false,
    }
        tasks.push(newtask);
        savedata();
        render(newtask);       //we call it after savedata to load task immediatly
        todoinput.value="";    //clears the input
        console.log(tasks);
    
})
todoinput.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        addtask.click();  //by this we can add task by pressing enter
    }
})

//we will render the task and then delete the task as well
function render(task){  
    const li=document.createElement('li')
    li.setAttribute('data-id',task.id)
    if(task.completed) li.classList.add("completed")
    
    li.innerHTML=`
    <span>${task.text}</span>
    <button>Delete</button>
    `; //this wont work untill we attach li to DOM
    li.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON'){  //this is to know if click is on whole list or delete button
            return;
        } else {
            task.completed = !task.completed //this will change status from false to true
            li.classList.toggle("completed");
            savedata();
        } 
    })
    li.querySelector('button').addEventListener('click', (e)=>{   // in above event listner we ignored the delete button now in this we are selecting that
        e.stopPropagation() //stop bubbling of events and i will prevent toggle from firing
        tasks = tasks.filter(t=>t.id !==task.id) //only true element will comeback
        li.remove();
        savedata();
    })
    
    todolist.appendChild(li) //li is attached to DOM
}
function savedata(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
})