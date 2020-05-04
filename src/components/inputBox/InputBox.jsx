import React, { useState, useEffect } from "react";
import { TextField, Typography, IconButton } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

import styles from "./InputBox.module.css";
const InputBox = ({ InputCallback }) => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setTask(input);
    if (list.length) {
      setList((list) => [...list, task]);
    } else {
      setList((list) => [task]);
    }
    InputCallback(list);
  };
  return (
    <div className="container">
      <form noValidate autoComplete="off" onSubmit={handleClick}>
        <TextField
          className={styles.TextField}
          id="filled-basic"
          label="Add Task"
          variant="filled"
          color="secondary"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <IconButton
          color="secondary"
          aria-label="add"
          className="icon-btn"
          onClick={handleClick}
        >
          <AddBoxIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default InputBox;
