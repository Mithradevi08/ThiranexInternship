import Task from '../models/Task.js';

// @desc Get all tasks for current user
// @route GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create a new task
// @route POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Task title is required' });
    }

    const task = await Task.create({
      user: req.user._id,
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category ? category.trim() : 'General',
      priority: priority || 'Medium',
      dueDate: dueDate || '',
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update a task
// @route PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Ensure user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to modify this task' });
    }

    const { title, description, category, priority, dueDate, status } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (category !== undefined) task.category = category;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();

    res.json({
      success: true,
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Toggle task status (Completed / Pending)
// @route PATCH /api/tasks/:id/toggle
export const toggleTaskStatus = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to modify this task' });
    }

    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    const updatedTask = await task.save();

    res.json({
      success: true,
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete a task
// @route DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
