import { useEffect, useState } from 'react';
import '../css/Note.css';
import CreateNote from './CreateNote';
import Note from './Note';

const BASE_URL = 'http://localhost:8000';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [charLeft, setCharLeft] = useState(100)

  const textHandler = (e) => {
    setInputText(e.target.value);
    const charLimit = 100;
    setCharLeft(charLimit - e.target.value.length)
  };

  const saveHandler = () => {
    fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes((prevState) => [...prevState, data]);
        setInputText('');
      });
  };
  const deleteNote = (id) => {
    fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const filteredNotes = notes.filter((note) => note._id !== id);
      setNotes(filteredNotes);
    });
  };
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/notes`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNotes(data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className='notes'>
      {notes.map((note) => (
        <Note key={note._id} note={note} deleteNote={deleteNote} />
      ))}

      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
        charLeft={charLeft}
      />
    </div>
  );
};

export default Notes;
