import React from 'react'

export default class AddNote extends React.Component {
    render() {
        return(
            <div className="addNote">
                <form className="addNoteForm">
                    <label htmlFor="addNoteName">Note Name</label>
                    <input type="text" name="addNoteName" required/>
                    <label htmlFor="newNote">Enter Note Here</label>
                    <textarea name="newNote" />
                    <button type="submit">Create Note</button>
                </form>
            </div>
        )
    }
}