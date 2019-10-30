import React from 'react'
import PropTypes from 'prop-types'
import './AddFolder.css'

export default class AddFolder extends React.Component {
    render() {
        return(
            <div className="addFolder" >
                <form className="addFolderForm" 
                    onSubmit={(event) => {
                        event.preventDefault();
                        this.props.addFolder({
                            name: event.target.folderName.value
                        })
                    }}>
                    <label htmlFor="folderName" className="addFolderForm-label">Folder Name</label>
                    <input type="text" name="folderName" className="addFolderForm-input" required />
                    <button type="submit">Create Folder</button>
                </form>
            </div>
        )
    }
}

AddFolder.propTypes = {
    addFolder: PropTypes.func
}