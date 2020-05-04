import React, { useState, useEffect } from "react";
import { Card, Typography, CardContent, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styles from "./List.module.css";
import classNames from "classnames";

const List = ({ item, callback }) => {
  const [newClass, setNewClass] = useState(styles.container);
  const [completeClass, setCompleteClass] = useState(styles.item);
  const [opacityClass, setOpacityClass] = useState(styles.container);

  const removeLocal = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todos.indexOf(item);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    sendReload();
  };

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const sendReload = () => {
    callback(true);
  };

  const deleteBox = () => {
    setNewClass(styles.containerFall);
    removeLocal();
  };

  const completed = () => {
    setCompleteClass(styles.completed);
    setOpacityClass(styles.completedOpacity);
  };

  return (
    <div className={classNames(styles.container, newClass, opacityClass)}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Typography
            color="textPrimary"
            className={classNames(styles.item, completeClass)}
          >
            {item}
          </Typography>
          <div className={styles.checkBox}>
            <IconButton
              onClick={completed}
              color="secondary"
              aria-label="add"
              className="icon-btn"
            >
              <CheckIcon />
            </IconButton>
          </div>
          <div className="delete-box">
            <IconButton
              onClick={deleteBox}
              color="secondary"
              aria-label="delete"
              className="icon-btn"
            >
              <DeleteForeverIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default List;
