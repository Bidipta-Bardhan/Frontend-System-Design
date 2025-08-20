import express from 'express';
import bodyParser from 'body-parser';
const app=express();
app.use(bodyParser.json());
const PORT=5111;
app.all('/',(req,res)=>{
    // console.log('req-',req);
    // console.log('res-',res);
    res.send(`I'm up`);
})
const todos=[{
    id: '1',
    title: 'Task 1',
    completed: true
},
{
    id: '2',
    title: 'Task 2',
    completed: false
}
]
// CREATE
app.post('/todos',(req,res)=>{
    const newTodo=req.body;
    todos.push(newTodo);
    res.status(201).json({
        message: todos
    })
})
// READ
app.get('/todos',(req,res)=>{
    res.status(200).json(todos);
})
// UPDATE
app.put('/todos/:id',(req,res)=>{
    const newTodoData=req.body;
    const todoId=todos.findIndex((td)=>td.id===req.params.id);
    if(todoId!==-1)
    {
        todos[todoId]={
            id: req.params.id,
            ...newTodoData
        }
        res.status(200).json(todos);
    }else{
        res.status(400).json({
            message: 'Id not found'
        })
    }
})
// DELETE
app.delete('/todos/:id',(req,res)=>{
    const todoId=todos.findIndex((td)=>td.id===req.params.id);
    if(todoId!==-1)
    {
        todos.splice(todoId,1);
         res.status(200).json(todos);
    }else{
        res.status(400).json({
            message: 'Id not found'
        })
    }
})
app.listen(PORT,()=>{
    console.log(`Server is listnening at ${PORT}`);
})