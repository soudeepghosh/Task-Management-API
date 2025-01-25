const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/api', taskRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})