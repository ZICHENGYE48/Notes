import Header from './components/NoteComponents/Header';
import Notes from './components/NoteComponents/Notes';
import './components/css/App.css';

function App() {
  return (
    <div className="main">
      <Header/>
      <Notes/>
    </div>
  );
}

export default App;