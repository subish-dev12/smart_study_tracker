import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { AlertDialogDestructive } from "./components/ui/AlertDialogDestructive";

function App() {
  // const [openForm, setOpenForm] = useState(false);
  const [task, setTask] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [addInput, setAddInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const focusRef = useRef(null);
  const [xp, setXp] = useState(0);

  const XPVALUE = 10;

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  // function handleXp(id) {

  // }

  function handleForm(e) {
    e.preventDefault();
    if (addInput.trim()) {
      const obj = {
        id: crypto.randomUUID(),
        task: addInput,
        completed: false,
      };
      setTask((prev) => [...prev, obj]);
      e.target.reset();
      setAddInput("");
    }
    // toast.success("New Task Added !!", {
    //   position: "top-right",
    //   icon: <CircleCheck className="text-green-500" />,
    // });
  }

  function handleDelete(i) {
    setTask((prev) => prev.filter((item) => item.id !== i));
  }

  function handleEditMode(i, task) {
    setEditMode(i);
    setEditInput(task);
  }

  function handleEdit(i, currentinput) {
    if (currentinput === editInput) {
      setEditMode(false);
      return;
    }

    setTask((prev) =>
      prev.map((item) => (item.id === i ? { ...item, task: editInput } : item)),
    );
    setEditMode(false);

    if (focusRef.current) {
      focusRef.current.focus();
    }
  }

  //instead of dependeing on the external dependency of completed / i can derive complete status inside the udpater function and update state according,y
  function handleCompletedTask(id, completed) {
    setTask((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !completed } : item,
      ),
    );
    setXp((prev) => (completed ? prev - XPVALUE : prev + XPVALUE));

    if (!completed) {
      toast.success("+10 XP Gained", {
        position: "top-right",
        icon: <CheckCircle2 className="text-green-500" />,
        duration: 2000,
      });
    }
  }

  const completedTasks = task.filter((item) => item.completed).length;

  return (
    <>
      <div className="max-w-md mx-auto mt-6">
        <div className="p-6 bg-slate-900/5 dark:bg-slate-800/60 rounded-2xl border border-slate-700/20 shadow-md">
          <div className="flex justify-between items-center">
            <Badge
              variant="default"
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white shadow-md bg-linear-to-r from-indigo-500 to-violet-500"
            >{`${completedTasks}/${task.length}`}</Badge>
            <Badge className="px-5 py-1.5 text-lg rounded-full text-white font-bold shadow-md bg-linear-to-r from-amber-400 via-amber-300 to-rose-400">{`⭐ ${xp} XP`}</Badge>
          </div>

          <form onSubmit={handleForm} className="mt-4">
            <input
              name="task"
              className="w-full border border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400/30 caret-slate-900 dark:caret-slate-100"
              value={addInput}
              onChange={(e) => setAddInput(e.target.value)}
              ref={focusRef}
            />
          </form>

          <ul className="mt-6 space-y-3">
            {task.map((item) => (
              <li
                key={item.id}
                  className={`w-full flex justify-between items-center p-4 rounded-2xl border border-slate-700/20 bg-linear-to-r from-slate-800/10 to-slate-700/10 shadow-md hover:scale-[1.01] transform-gpu transition-all duration-200 border-l-4 border-l-transparent ${item.completed ? " bg-green-400" : ""}`}
              >
                {editMode === item.id ? (
                  <>
                    <input
                      name="task"
                      className="border border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 rounded px-3 py-2 caret-slate-900 dark:caret-slate-100"
                      value={editInput}
                      onBlur={() => handleEdit(item.id, item.task)}
                      onChange={(e) => setEditInput(e.target.value)}
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
                      <Button onClick={() => setEditMode(false)}>
                        ❌Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <span
                      className={`text-lg font-semibold px-3 py-1 rounded-full`}
                    >
                      {item.task}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={(e) => handleEditMode(item.id, item.task, e)}
                      >
                        ✏️Edit
                      </Button>
                      <AlertDialogDestructive
                        taskId={item.id}
                        onDelete={handleDelete}
                      />
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          handleCompletedTask(item.id, item.completed);
                        }}
                        variant="outline"
                        className="cursor-pointer"
                      >
                        +
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
