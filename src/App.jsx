import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Filter, List } from "./components";
import { Typography, IconButton, TextField } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

const App = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [condition, setCondition] = useState(true);
  const [helper, setHelper] = useState("");
  const [reload, setReload] = useState(false);

  let found = 1;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  useEffect(() => {
    found = 1;
    getLocal();
    let i = 0;
    console.log(`Reloaded : ${reload} x ${i + 1}`);
  }, []);

  const callBack = (value) => {
    setReload(value);
  };

  const storeLocal = (list) => {
    todos.push(list);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocal = () => {
    todos.map(function (todo) {
      setList((list) => [...list, todo]);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setError(true);
      setHelper("Task can't be empty !");
    } else {
      setError(false);
      setHelper("");
      if (list[0] === null) {
        setList([input]);
      } else {
        todos.find((element) => element === input.trim())
          ? (found = 1) && setHelper("Task already exists !")
          : (found = 0);
        ///found ? (found = 1) : setList((list) => [...list, input]);
        if (found) {
        } else {
          setList((list) => [...list, input]);
          storeLocal(input);
        }
        //  storeLocal(input);
        document.getElementById("formInput").reset();
      }
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h2" gutterBottom>
        To-Do List
      </Typography>
      <div className="container">
        <form
          noValidate
          autoComplete="off"
          id="formInput"
          onSubmit={handleClick}
        >
          <TextField
            error={error}
            className={styles.TextField}
            id="filled-basic"
            label="Add Task"
            variant="filled"
            color="primary"
            helperText={helper}
            onChange={(e) => {
              setInput(e.target.value);
              setCondition(false);
              setError(false);
              setHelper("");
            }}
          />
          <IconButton
            disabled={condition}
            color="primary"
            aria-label="add"
            className="icon-btn"
            onClick={handleClick}
          >
            <AddBoxIcon />
          </IconButton>
        </form>
      </div>
      {list.map((todo, index) => (
        <List callback={callBack} item={todo} key={index} />
      ))}
    </div>
  );
};

export default App;
