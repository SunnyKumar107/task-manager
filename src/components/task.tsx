import { Check, CheckCheck, Trash2, X } from 'lucide-react'
import { Task as TaskType } from '../lib/definition'
import { TasksContext } from '../context/task-provider'
import { useContext } from 'react'

function Task({ task }: { task: TaskType }) {
  const { setTasks } = useContext(TasksContext)

  const handleDelete = () => {
    const allTasks = localStorage.getItem('tasks')
    if (allTasks) {
      const filteredTasks = JSON.parse(allTasks).filter(
        (t: TaskType) => t.id !== task.id
      )

      localStorage.setItem('tasks', JSON.stringify(filteredTasks))
      setTasks(filteredTasks)
    }
  }

  const handleUpdateComplete = () => {
    const taskForUpdate: TaskType = { ...task, isCompleted: !task.isCompleted }

    const tasksInStringForm = localStorage.getItem('tasks')
    if (tasksInStringForm) {
      const tasks = JSON.parse(tasksInStringForm)

      const updatedTasks = tasks.map((t: TaskType) => {
        t.id === task.id ? taskForUpdate : t
      })

      // localStorage.setItem('tasks', JSON.stringify(taskForUpdates))
      console.log('handleCompleteUpdate', updatedTasks)
      setTasks(updatedTasks)
    }
  }

  return (
    <div
      className={`flex items-center justify-between border-[1px] rounded-full p-3 px-4 ${
        task.isCompleted ? 'border-green-500' : 'border-orange-500'
      }`}
    >
      <h2
        className={`flex ${
          task.isCompleted ? 'text-green-500' : 'text-orange-500'
        }`}
      >
        {task.title}{' '}
        {task.isCompleted && <CheckCheck className='text-white ml-2' />}
      </h2>
      <div className='flex items-center justify-end space-x-2'>
        <button
          onClick={handleUpdateComplete}
          className={`font-bold rounded-sm p-1 ${
            task.isCompleted
              ? 'hover:bg-green-500/90 bg-green-500'
              : 'bg-orange-500 hover:bg-orange-500/90'
          }`}
        >
          {task.isCompleted ? <Check size={20} /> : <X size={20} />}
        </button>
        <button
          onClick={handleDelete}
          className='bg-red-500 font-bold rounded-sm p-1 hover:bg-red-500/90'
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}

export default Task
