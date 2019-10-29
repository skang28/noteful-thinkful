import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import './App.css';
import config from '../config'
import NotesContext from '../NotesContext'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
        .then(([notesRes, foldersRes]) => {
            if(!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e));
            if(!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e));
            return Promise.all([notesRes.json(), foldersRes.json()]);
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
            console.log(notes)
        })
        .catch(error => {
            console.error({error});
        })
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        })
    }

    addFolder = (newFolder) => {
        // let newFolders = this.state.folders 
        //newFolders.push(newFolder)
        //this.setState({folders: newFolder})
        let newFolders = this.state.folders
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST'
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(
                newFolders.push(newFolder),
                this.setState({folders: newFolders})
            )
            .catch((error) => console.log(error))
    }

    addNote = (newNote) => {
        let newNotes = this.state.notes
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST'
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(
            newNotes.push(newNote),
            this.setState({notes: newNotes})
        )
        .catch((error) => console.log(error))
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav}/>
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
                <Route 
                    path="/add-folder"
                    render={(props) => <AddFolder addFolder={this.addFolder} />}
                />
                <Route
                    path="/add-note/:folderId"
                    render={(props) => <AddNote addNote={this.addNote} folderId={props.match.params.folderId}/>}
                />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote
        }
        return (
            <NotesContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </NotesContext.Provider>
        );
    }
}

export default App;
