import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [task, setTask] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState("");

  function handleForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentTask = formData.get("task");

    if (currentTask.trim()) {
      const obj = {
        id: crypto.randomUUID(),
        task: currentTask,
      };
      setTask((prev) => [...prev, obj]);
      e.target.reset();
    }
  }

  function handleDelete(i) {
    setTask((prev) => prev.filter((item) => item.id !== i));
  }

  function handleEditMode(i, task) {
    setEditMode(i);
    setEditedData(task);
  }

  function handleEdit(i, currentEditedData) {
    if (currentEditedData === editedData) {
      setEditMode(false);
      return;
    }

    setTask((prev) =>
      prev.map((item) =>
        item.id === i ? { ...item, task: editedData } : item,
      ),
    );
    setEditMode(false);
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-orange-600 underline">Home s</h1>
      <div className="flex gap-4 items-center mt-4">
        <Button
          variant="destructive"
          onClick={() => setOpenForm((prev) => !prev)}
        >
          Add New Task
        </Button>
        {openForm && (
          <form onSubmit={handleForm} className="flex gap-2">
            <input
              name="task"
              className="border border-gray-300 rounded px-3 py-2"
            />

            <Button type="submit">Submit</Button>
          </form>
        )}
      </div>

      <ul className="mt-6 space-y-2">
        {task.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg border border-gray-300"
          >
            {editMode === item.id ? (
              <>
                <input
                  autoFocus
                  name="task"
                  className="border border-gray-300 rounded px-3 py-2"
                  value={editedData}
                  onChange={(e) => setEditedData(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEdit(item.id, item.task);
                    }
                    if (e.key === "Escape") {
                      setEditMode(false);
                    }
                  }}
                />

                <div>
                  <Button onClick={() => handleEdit(item.id, item.task)}>
                    ✅Confirm Changes
                  </Button>
                  <Button onClick={() => setEditMode(false)}>❌Cancel</Button>
                </div>
              </>
            ) : (
              <>
                <span className="text-lg font-medium">{item.task} </span>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleEditMode(item.id, item.task)}
                  >
                    🗑️Edit
                  </Button>
                  <Button variant="outline" size="lg">
                    ✅Mark Complete
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
