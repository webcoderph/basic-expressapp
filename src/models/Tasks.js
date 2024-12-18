import db from "../config/database.js";

class Tasks {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tasks ORDER BY createdAt ASC",
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        },
      );
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tasks WHERE task_id = ?",
        [id],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        },
      );
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const { title, description, user_id } = data;
      db.query(
        "INSERT INTO tasks (title, description, user_id ) VALUES (?, ?, ?)",
        [title, description, user_id],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        },
      );
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { title, description, status } = data;
      db.query(
        "UPDATE tasks SET title = ?, description = ?, status = ? WHERE task_id = ?",
        [title, description, status, id],
        (error) => {
          if (error) reject(error);

          resolve(id);
        },
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM tasks WHERE task_id = ?", [id], (error) => {
        if (error) reject(error);
        resolve(id);
      });
    });
  }
}

export default Tasks;
