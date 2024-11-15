import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'
import { Task } from '../lib/definition'

interface TaskContextType {
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const TasksContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => []
})

interface TaskProviderProps {
  children: ReactNode
}

export function TaskProvider({ children }: TaskProviderProps): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  )
}
