import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Input from "@mui/material/Input";

import Container from "@mui/material/Container";

export const Todo = ({ todo, handleDelete, handleEdit }) => {
  const [isEditing, setIsEdting] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const handleEditBtn = () => {
    setIsEdting(true);
  };

  const handleSave = () => {
    if (editedTask.trim()) {
      handleEdit(todo._id, editedTask);
      setIsEdting(false);
    }
  };

  const toggleTaskStatus = () => {
    handleEdit(todo._id, editedTask, !todo.completed);
  };

  const taskInCompleted = () => {
    setIsCompleted(false);
    handleEdit(todo._id, editedTask);
  };

  return (
    <Container className="task" fixed>
      {isEditing ? (
        <Input
          className="input"
          disableUnderline
          fullWidth
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <p className={todo.completed ? "completed" : ""}>{todo.task}</p>
      )}
      <div className="taskBtn">
        {isEditing ? (
          <IconButton onClick={handleSave}>
            <AddTaskIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleEditBtn}>
            <EditIcon />
          </IconButton>
        )}

        <IconButton onClick={toggleTaskStatus}>
          {todo.completed ? <ClearIcon /> : <CheckIcon />}
        </IconButton>

        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Container>
  );
};
