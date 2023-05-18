import { Component } from "react";

import { Navigate } from "react-router-dom";

import TodoItem from "../TodoItem/index";

import Header from "../Header";

import { v4 as uuid } from "uuid";
import "./index.css";
import Cookies from "js-cookie";
import axios from "axios";
import TodoContext from "../../TodosContext/TodoContext";

class Home extends Component {
  state = { todosList: [], inputEl: "", title: "", status: "IN PROGRESS" };
  componentDidMount() {
    const jwtToken = Cookies.get("jwtToken");
    const headers = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    axios
      .get("https://todoapplication-obs9.onrender.com/todosList", headers)
      .then((res) => {
        this.setState({ todosList: res.data });
      });
  }

  onChangeStatus = (isChecked, id) => {
    console.log(id);
    if (isChecked === false) {
      this.setState((prevState) => ({
        todosList: prevState.todosList.map((eachItem) => {
          if (eachItem.id === id) {
            return { ...eachItem, status: "COMPLETED" };
          }
          return eachItem;
        }),
      }));
    } else {
      this.setState((prevState) => ({
        todosList: prevState.todosList.map((eachItem) => {
          if (eachItem.id === id) {
            return { ...eachItem, status: "IN PROGRESS" };
          }
          return eachItem;
        }),
      }));
    }
  };

  onChangeTask = (event) => {
    this.setState({ inputEl: event.target.value });
  };

  onClickMakeList = () => {
    const { todosList, inputEl, title, status } = this.state;
    const newList = {
      id: uuid(),
      title: inputEl,
      status,
    };
    this.setState((prevState) => ({
      todosList: [...prevState.todosList, newList],
      title: "",
      status,
      inputEl: "",
    }));
  };

  onDelete = (id) => {
    this.setState((prevState) => ({
      todosList: prevState.todosList.filter((eachItem) => eachItem.id !== id),
    }));
  };

  render() {
    const { todosList, inputEl, status, title } = this.state;
    console.log(todosList);
    const onSaveDelete = async () => {
      const jwtToken = Cookies.get("jwtToken");

      const headers = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      await axios
        .delete("https://todoapplication-obs9.onrender.com/deleteList", headers)
        .then(async (res) => await console.log("DELETED SUCCESSFULLY"))
        .catch((err) => console.log(err.message));
    };

    const onSaveTodoList = async () => {
      const jwtToken = Cookies.get("jwtToken");
      const headers = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      await axios
        .post(
          "https://todoapplication-obs9.onrender.com/saveTodo",
          todosList,
          headers
        )
        .then(async (res) => await console.log("Successfully Fetched"))
        .catch((err) => console.log(err.message));
    };

    const onClickSave = async () => {
      await onSaveDelete();
      await onSaveTodoList();
    };

    return (
      <TodoContext.Provider
        value={{
          todosList,
          onChangeTask: this.onChangeTask,
          inputEl,
          status,
          title,
          onClickMakeList: this.onClickMakeList,
          onChangeStatus: this.onChangeStatus,
          onDelete: this.onDelete,
        }}
      >
        <div className="todos-bg-container">
          <div className="container">
            <div className="row">
              <div className="header">
                <Header />
                <h1 className="create-task-heading">
                  Create
                  <span className="create-task-heading-subpart">Task</span>
                </h1>
                <input
                  type="text"
                  id="todoUserInput"
                  value={inputEl}
                  className="todo-user-input"
                  onChange={this.onChangeTask}
                  placeholder="What needs to be done?"
                />
                <button
                  className="button"
                  id="addTodoButton"
                  onClick={this.onClickMakeList}
                >
                  Add
                </button>
                <h1 className="todo-items-heading">
                  My
                  <span className="todo-items-heading-subpart">Tasks</span>
                </h1>
                <ul
                  className="todo-items-container"
                  id="todoItemsContainer"
                ></ul>
                <ul type="none" className="list-container">
                  {todosList.map((eachItem) => (
                    <TodoItem key={eachItem.id} todoItem={eachItem} />
                  ))}
                </ul>
                <button
                  className="button"
                  onClick={onClickSave}
                  id="saveTodoButton"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </TodoContext.Provider>
    );
  }
}

export default Home;
