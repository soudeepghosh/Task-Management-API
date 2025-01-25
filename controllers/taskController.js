const { v4: uuidv4 } = require('uuid');
const taskModel = require('../models/taskModel');

const getTasks = async (req, res) => {
    const {search='', page=1, limit=10} = req.query;
    const offset = (page - 1) * limit;

    try {
        const tasks = await taskModel.getTasks(search, limit, offset);
        const totalTasks = await taskModel.getTotalTasks(search);

        res.json({
            totalTasks,
            currentPage: parseInt(page),
            tasks
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
}; 

const addTask = async (req, res) => {
    console.log("Request body:: ",req.body);
    
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }
    try {
      const newTask = await taskModel.addTask(name, description);
      res.status(201).json({
        status: 'success',
        data: {
            task: newTask
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};

const updateTask = async (req, res) => {
    console.log("Request Body :: ",req.body);
    
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Not Started', 'In Progress', 'Completed'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Status must be one of ${validStatuses.join(', ')}.` });
    }
  
    try {
      const updatedTask = await taskModel.updateTask(id, status);
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found.' });
      }
      res.json(updatedTask);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTask = await taskModel.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ error: `Task not found with id ${id}` });
      }
    //   console.log(deleteTask);

      res.json({
        message: 'Task deleted successfully.'
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};