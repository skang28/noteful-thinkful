import React from 'react'

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
                            content: event.target.newNote.value
                        })
                    }}>
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