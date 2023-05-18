import { useState } from "react";
import TodoContext from "../../TodosContext/TodoContext";

import { AiOutlineDelete } from "react-icons/ai";

import "./index.css";

const TodoItem = (props) => {
  const { todoItem } = props;

  const { id, title, status } = todoItem;

  const [isCheckbox, setCheckboxStatus] = useState(
    status === "COMPLETED" ? true : false
  );

  return (
    <TodoContext.Consumer>
      {(value) => {
        const { onChangeStatus, onDelete } = value;

        const onDeleteBtn = () => {
          onDelete(id);
        };

        const onChangeCheckbox = () => {
          setCheckboxStatus((prevState) => !prevState);
        };

        const labelClass = status === "COMPLETED" ? "tick-class" : "nor-class";

        return (
          <li className="label-container">
            <input
              type="checkbox"
              onClick={() => {
                onChangeCheckbox();
                onChangeStatus(isCheckbox, id);
              }}
              checked={isCheckbox}
            />
            <p className={labelClass}>{title}</p>
            <button type="button" onClick={onDeleteBtn} className="delete-btn">
              <AiOutlineDelete className="delete-icon" />
            </button>
          </li>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default TodoItem;
