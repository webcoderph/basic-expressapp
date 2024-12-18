import db from "../config/database.js";
class Users {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users ORDER BY createdAt ASC",
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        },
      );
    });
  }

  static getUserById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [id],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        },
      );
    });
  }

  static getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        },
      );
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const { first_name, last_name, email, password } = data;
      db.query(
        "INSERT INTO users (first_name, last_name, email, password ) VALUES (?, ?, ?, ?)",
        [first_name, last_name, email, password],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        },
      );
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { first_name, last_name, email, password } = data;
      if (password) {
        db.query(
          "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE task_id = ?",
          [first_name, last_name, email, password, id],
          (error) => {
            if (error) reject(error);

            resolve(id);
          },
        );
      } else {
        db.query(
          "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE task_id = ?",
          [first_name, last_name, email, id],
          (error) => {
            if (error) reject(error);

            resolve(id);
          },
        );
      }
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE user_id = ?", [id], (error) => {
        if (error) reject(error);
        resolve(id);
      });
    });
  }
}

export default Users;
