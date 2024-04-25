import reactLogo from './assets/react.svg';
import './App.css';
import { Counter } from './features/counter/Counter'

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={reactLogo} className='App-logo' alt='logo' />
          <Counter />
        </header>
      </div>
  )
}

export default App