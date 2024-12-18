import Tasks from "../models/Tasks.js";

class TasksController {
  static async getAll(req, res) {
    const tasks = await Tasks.getAll();

    res.status(200).json(tasks);
  }

  static async create(req, res) {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        throw new Error("Title and Description is required!");
      }

      const data = {
        title,
        description,
        user_id: req.user.user_id,
      };

      const result = await Tasks.create(data);

      if (!result)
        throw new Error("Oops, something went wrong! Please try again.");

      const task = await Tasks.getById(result.insertId);

      return res.status(200).json({
        status: "success",
        data: task,
      });
    } catch (error) {
      console.log(">>ERROR", error);
      let msg = error.message;
      if (error.code === "ER_DUP_ENTRY") {
        msg = "Title already exists!";
      }
      res.status(500).json({ status: "error", message: msg });
    }
  }

  static async update(req, res) {
    try {
      const { title, description, status } = req.body;
      const data = {
        title,
        description,
        status,
      };

      const result = await Tasks.update(req.params.id, data);

      if (!result)
        throw new Error("Oops, something went wrong! Please try again.");
      const task = await Tasks.getById(result);

      return res.status(200).json({
        status: "success",
        data: task,
      });
    } catch (error) {
      console.log(">>ERROR", error);
      let msg = error.message;
      if (error.code === "ER_DUP_ENTRY") {
        msg = "Title already exists!";
      }
      res.status(500).json({ status: "error", message: msg });
    }
    return res.status(200);
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Id is required!");
      const task = await Tasks.getById(id);
      if (!task) throw new Error("Task does not exist!");
      if (Array.isArray(task) && task.length === 0)
        throw new Error("Task does not exist!");
      const result = await Tasks.delete(id);

      if (!result)
        throw new Error("Oops, something went wrong! Please try again.");

      return res.status(200).json({
        status: "success",
        data: { deleteId: id },
      });
    } catch (error) {
      const msg = error.message;
      res.status(500).json({ status: "error", message: msg });
    }
  }
}

export default TasksController;
