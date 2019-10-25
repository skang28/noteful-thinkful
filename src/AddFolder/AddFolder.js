import React from 'react'

export default class AddFolder extends React.Component {
    render() {
        return(
            <div className="addFolder" >
                <form className="addFolderform">
                    <label htmlFor="folderName">Folder Name</label>
                    <input type="text" name="folderName" required />
                    <button type="submit">Create Folder</button>
                </form>
            </div>
        )
    }
}