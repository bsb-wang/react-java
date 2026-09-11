import './App.css'
import { GlobalMessage } from './components/common/GlobalMessage'
import AppRouter from './router'

function App() {

  return (
    <>
      <AppRouter />
      <GlobalMessage /> {/* 全局挂载 */}
    </>
  )
}

export default App
