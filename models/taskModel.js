const pool = require('../config/db');

const getTasks = async (search , limit, offset) => {
    const result = await pool.query(
        `
        SELECT * FROM tasks
        WHERE name ILIKE $1 AND is_active = TRUE
        LIMIT $2 OFFSET $3
        `,
        [`%${search}%`, limit, offset]
    );
    return result.rows;
};

const getTotalTasks = async (search) => {
    const result = await pool.query(
      `SELECT COUNT(*) FROM tasks WHERE name ILIKE $1 AND is_active = TRUE`,
      [`%${search}%`]
    );
    return result.rows[0].count;
};

const addTask = async (name, description) => {
    const result = await pool.query(
      'INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return result.rows[0];
};

const updateTask = async (id, status) => {
    const result = await pool.query(
      'UPDATE tasks SET status = $1, is_active = $2 WHERE id = $3 RETURNING *',
      [status, status === 'Completed' ? false : true, id]
    );
    return result.rows[0];
};

const deleteTask = async (id) => {
    const result = await pool.query(
      'UPDATE tasks SET is_active = FALSE WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
};

module.exports = {
    getTasks,
    getTotalTasks,
    addTask,
    updateTask,
    deleteTask
  };