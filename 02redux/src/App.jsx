import "./App.css";
import AddTodo from "./Components/addtodo";
import Todos from "./Components/Todo";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white">Redux Todo App</h1>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
