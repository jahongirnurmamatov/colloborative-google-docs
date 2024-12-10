import TextEditor from "./components/TextEditor"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/:id" element={<TextEditor />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App