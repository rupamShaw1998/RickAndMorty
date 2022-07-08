import './App.css'
import { Search } from './Components/Search'
import { Heading ,Box} from '@chakra-ui/react'

function App() {
  

  return (
    <div className="App">
      <Box position='relative' top={150}>
        <Heading>Ricky and Morty Search</Heading>
        <Search/>
      </Box>
    </div>
  )
}

export default App