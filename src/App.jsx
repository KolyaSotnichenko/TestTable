import { Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import './App.css'

const App = () => {

  return (
    <div className="App">
      <Box>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src="react-2.svg" className="logo react" alt="React logo" />
        </a>
      </Box>
      <h1>Vite + React</h1>
      <Box>
        <Link style={{textDecoration: 'none', color: 'yellow'}} to={`/users`}>
          <Typography>
            /users
          </Typography>
        </Link>
      </Box>
    </div>
  )
}

export default App
