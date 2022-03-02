import "./styles.css";
import React from "react";

import data from "./mockdata.json";

//displays grocery list item
const ToBuy = ({ tobuy, handleToggle }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.currentTarget.id);
  };
  return (
    <div
      id={tobuy.id}
      key={tobuy.id + tobuy.task}
      name="todo"
      value={tobuy.id}
      onClick={handleClick}
      className={tobuy.complete ? "strike" : ""}
    >
      {tobuy.item}
    </div>
  );
};

//iterates over grovery list items
const ToBuyList = ({ toBuyList, handleToggle, handleFilter }) => {
  return (
    <div>
      {toBuyList.map((tobuy) => {
        return <ToBuy tobuy={tobuy} handleToggle={handleToggle} />;
      })}
      <button style={{ margin: "20px" }} onClick={handleFilter}>
        Remove completed items
      </button>
    </div>
  );
};

//form for enmtering new items
const ToBuyForm = ({ addTask }) => {
  const [userInput, setUserInput] = React.useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={userInput}
        type="text"
        onChange={handleChange}
        placeholder="Enter task..."
      />
      <button>Submit</button>
    </form>
  );
};

const App = () => {
  const [toBuyList, setToBuyList] = React.useState(data);

  //change completed value for item with specific id
  const handleToggle = (id) => {
    let mapped = toBuyList.map((task) => {
      return task.id == id
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToBuyList(mapped);
  };

  //filter list, so only uncompleted items remain
  const handleFilter = () => {
    let filtered = toBuyList.filter((task) => {
      return !task.complete;
    });
    setToBuyList(filtered);
  };

  const addTask = (userInput) => {
    console.log(userInput);
    let copy = [...toBuyList];
    copy = [
      ...copy,
      { id: toBuyList.length + 1, item: userInput, complete: false }
    ];
    setToBuyList(copy);
  };

  return (
    <div className="App">
      <header>
        <h1>To Do List</h1>
      </header>
      <ToBuyList
        toBuyList={toBuyList}
        handleToggle={handleToggle}
        handleFilter={handleFilter}
      />
      <ToBuyForm addTask={addTask} />
    </div>
  );
};

export default App;
