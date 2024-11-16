import { Plus, Search } from 'lucide-react'
import Task from './components/task'
import { useContext, useEffect, useState } from 'react'
import { TasksContext } from './context/task-provider'
import { Task as TaskType } from './lib/definition'

function App() {
  const buttons = [
    { id: 1, name: 'All', type: 'all' },
    { id: 2, name: 'Completed', type: 'completed' },
    { id: 3, name: 'Not completed', type: 'notcompleted' }
  ]

  const { tasks, setTasks } = useContext(TasksContext)
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>(tasks)
  const [select, setSelect] = useState('all')
  const [newTask, setNewTask] = useState('')

  const handleCreateNewTask = () => {
    localStorage.removeItem('tasks')

    const newTasks: TaskType[] = [
      {
        id: Date.now(),
        title: newTask,
        isCompleted: false
      },
      ...(tasks || [])
    ]
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    setTasks(newTasks)
    setNewTask('')
  }

  const handleFilterTasks = ({
    type,
    title
  }: {
    type?: string
    title?: string
  }) => {
    if (tasks.length > 0) {
      if (type && type === 'all') {
        setFilteredTasks(tasks)
      } else if (type && type === 'completed') {
        setFilteredTasks(tasks.filter((task) => task.isCompleted === true))
        return tasks.filter((task) => task.isCompleted === true)
      } else if (type && type === 'notcompleted') {
        setFilteredTasks(tasks.filter((task) => task.isCompleted === false))
        return tasks.filter((task) => task.isCompleted === false)
      }

      if (title) {
        setFilteredTasks(
          filteredTasks.filter((task) =>
            task.title.toLowerCase().includes(title.toLowerCase())
          )
        )
        return
      }
      setFilteredTasks(tasks)

      return
    }

    setFilteredTasks(tasks)
  }

  useEffect(() => {
    const tasksInStringForm = localStorage.getItem('tasks')

    if (tasksInStringForm) {
      const sortedTasks = JSON.parse(tasksInStringForm).sort(
        (a: TaskType, b: TaskType) => b.id - a.id
      )
      setTasks(sortedTasks)
    }
  }, [])

  useEffect(() => {
    handleFilterTasks({ type: select ? select : 'all' })
  }, [select, tasks])

  return (
    <div className='flex flex-col items-center h-screen bg-background p-10'>
      <h1 className='text-4xl font-bold text-cyan-500'>Task Manager</h1>
      <div className='mt-8 w-full max-w-2xl p-2'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-2'>
          <span className='w-full max-w-md flex items-center'>
            <span className='h-10 flex items-center px-3 rounded-l-full bg-black/50'>
              <Search className='text-cyan-500' />
            </span>
            <input
              type='text'
              placeholder='Search'
              onChange={(e) => handleFilterTasks({ title: e.target.value })}
              className='w-full h-10 rounded-r-full outline-none bg-black/50'
            />
          </span>
          <span className='w-full max-w-md flex items-center'>
            <input
              type='text'
              placeholder='Add new ...'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className='w-full h-10 px-4 rounded-l-full outline-none bg-black/50'
            />
            <button
              onClick={handleCreateNewTask}
              disabled={!newTask}
              className='bg-green-600 h-10 px-3 rounded-r-full hover:bg-green-600/90'
            >
              <Plus />
            </button>
          </span>
        </div>
        {tasks.length > 0 ? (
          <div className='w-full mt-8'>
            <div className='flex flex-wrap items-center gap-2 mb-4 ml-2'>
              {buttons.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => setSelect(btn.type)}
                  className={`text-sm font-medium border-[1px] border-cyan-500 rounded-full px-4 py-1 ${
                    btn.type === select ? 'bg-cyan-500' : ''
                  }`}
                >
                  {btn.name}
                </button>
              ))}
            </div>
            <div className='flex flex-col space-y-2'>
              {tasks &&
                filteredTasks.map((task, i) => <Task key={i} task={task} />)}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center mt-8'>
            <p className='text-lg font-medium'>
              You're all caught up! 🎉 No tasks for now. Take a moment to relax
              or plan something new to stay productive!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
