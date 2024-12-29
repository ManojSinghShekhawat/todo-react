import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

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
    <div className="task">
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <p className={todo.completed ? "completed" : ""}>{todo.task}</p>
      )}
      <div className="taskBtn">
        {isEditing ? (
          <button onClick={handleSave}>
            <IoMdAdd style={{ fontSize: "20px" }} />
          </button>
        ) : (
          <button onClick={handleEditBtn}>
            <MdEdit style={{ fontSize: "20px" }} />
          </button>
        )}

        <button onClick={toggleTaskStatus}>
          {todo.completed ? (
            <RxCross2 style={{ fontSize: "20px" }} />
          ) : (
            <FaCheck style={{ fontSize: "20px" }} />
          )}
        </button>

        <button onClick={handleDelete}>
          <MdDeleteForever style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
};
