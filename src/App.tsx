import { Plus, Search } from 'lucide-react'
import Task from './components/task'
import { Task as TaskType } from './lib/definition'

function App() {
  const tasks: TaskType[] = [
    { id: 1, title: 'Task 1', isCompleted: false },
    { id: 2, title: 'Task 2', isCompleted: true },
    { id: 3, title: 'Task 3', isCompleted: false }
  ]

  return (
    <div className='flex flex-col items-center h-screen bg-background p-10'>
      <h1 className='text-4xl font-bold text-cyan-500'>Task Manager</h1>
      <div className='mt-8 w-full max-w-2xl p-2'>
        <div className='flex items-center justify-between space-x-2'>
          <span className='flex items-center'>
            <span className='h-10 flex items-center px-3 rounded-l-full bg-black/50'>
              <Search className='text-cyan-300' />
            </span>
            <input
              type='text'
              placeholder='Search'
              className='h-10 rounded-r-full outline-none'
            />
          </span>
          <span className='flex items-center'>
            <input
              type='text'
              placeholder='Create new...'
              className='h-10 px-4 rounded-l-full outline-none'
            />
            <button className='bg-green-600 h-10 px-3 rounded-r-full hover:bg-green-600/90'>
              <Plus />
            </button>
          </span>
        </div>
        <div className='w-full mt-8'>
          <div className='flex items-center justify-center space-x-2 mb-4'>
            <button className='text-sm font-medium border-[1px] border-cyan-400 rounded-full px-4 py-1'>
              All
            </button>
            <button className='text-sm font-medium border-[1px] border-cyan-400 rounded-full px-4 py-1'>
              Completed
            </button>
            <button className='text-sm font-medium border-[1px] border-cyan-400 rounded-full px-4 py-1'>
              Not Completed
            </button>
          </div>
          <div className='flex flex-col space-y-2'>
            {tasks.map((task, i) => (
              <Task key={i} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
