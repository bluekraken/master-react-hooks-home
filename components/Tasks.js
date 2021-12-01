import { useState, useEffect } from "react";

const TASKS_STORAGE_KEY = "TASKS_STORAGE_KEY";

const saveTasks = (taskMap) => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskMap));
};

const loadTasks = () => {
    const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));

    return taskMap ? taskMap : { tasks: [], completedTasks: [] };
};

function Tasks() {
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const savedTasks = loadTasks();

        setTasks(savedTasks.tasks);
        setCompletedTasks(savedTasks.completedTasks);
    }, []);

    useEffect(() => {
        saveTasks({ tasks, completedTasks });
    }, [tasks, completedTasks]);

    const updateText = (e) => {
        setText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    const addTask = () => {
        setTasks([...tasks, { uuid: crypto.randomUUID(), text }]);
        setText("");
    };

    const completeTask = (completedTask) => {
        setCompletedTasks([...completedTasks, completedTask]);
        setTasks(tasks.filter((task) => task.uuid !== completedTask.uuid));
    };

    const deleteTask = (uuid) => {
        setCompletedTasks(completedTasks.filter((task) => task.uuid !== uuid));
    };

    return (
        <div>
            <h3>Tasks</h3>

            <div className="form">
                <input value={text} onChange={updateText} onKeyPress={handleKeyPress} />
                <button onClick={addTask}>Add task</button>
            </div>

            <div className="task-list">
                {tasks.map((task) => {
                    const { uuid, text } = task;
                    return (
                        <div key={uuid} onClick={() => completeTask(task)}>
                            {text}
                        </div>
                    );
                })}
            </div>

            <div className="completed-list">
                {completedTasks.map(({ uuid, text }) => {
                    return (
                        <div key={uuid}>
                            {text}{" "}
                            <span onClick={() => deleteTask(uuid)} className="delete-task">
                                x
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Tasks;
