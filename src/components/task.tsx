import { Check, CheckCheck, Pencil, Trash2 } from 'lucide-react'
import { Task as TaskType } from '../lib/definition'

function Task({ task }: { task: TaskType }) {
  return (
    <div
      className={`flex items-center justify-between border-[1px] rounded-full p-3 px-4 ${
        task.isCompleted ? 'border-green-500' : ''
      }`}
    >
      <h2 className='flex'>
        {task.title}{' '}
        {task.isCompleted && <CheckCheck className='text-green-500 ml-2' />}
      </h2>
      <div className='flex items-center justify-end space-x-2'>
        {!task.isCompleted && (
          <button className='bg-green-500 font-bold rounded-sm p-1 hover:bg-green-500/90'>
            <Check size={20} />
          </button>
        )}
        <button className='bg-cyan-500 font-bold rounded-sm p-1 hover:bg-cyan-500/90'>
          <Pencil size={20} />
        </button>
        <button className='bg-red-500 font-bold rounded-sm p-1 hover:bg-red-500/90'>
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}

export default Task
