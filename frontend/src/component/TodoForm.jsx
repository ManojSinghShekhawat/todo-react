import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import AddTaskIcon from "@mui/icons-material/AddTask";

export const TodoForm = ({ todo, setTodo, handleSubmit }) => {
  return (
    <Container key={"qww"} className="heading">
      <form onSubmit={handleSubmit}>
        <Input
          className="input"
          disableUnderline
          fullWidth
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <IconButton type="submit" aria-label="Add Task">
          <AddTaskIcon />
        </IconButton>
      </form>
    </Container>
  );
};
