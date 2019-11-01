import React from 'react'
import PropTypes from 'prop-types'
import './AddNote.css'

export default class AddNote extends React.Component {
    render() {
        return(
            <div className="addNote">
                <form className="addNoteForm"
                    onSubmit = {(event) => {
                        event.preventDefault()
                        this.props.addNote({
                            name: event.target.addNoteName.value,
                            modified: new Date().toISOString(),
                            folderId: this.props.folderId,
                            content: event.target.newNote.value,
                        })
                        this.props.history.push('/')
                    }}>
                    <label htmlFor="addNoteName" className="addNoteName-label">Note Name</label>
                    <input type="text" name="addNoteName" className="addNoteName-input" required/>
                    <label htmlFor="newNote" className="addNoteHere-label">Enter Note Here</label>
                    <textarea name="newNote" className="addNote-textarea"/>
                    <button type="submit" className="addNoteButton">Create Note</button>
                </form>
            </div>
        )
    }
}

AddNote.propTypes = {
    folderId: PropTypes.string,
    addNote: PropTypes.func
}