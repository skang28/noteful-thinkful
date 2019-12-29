import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NotesContext from '../NotesContext'
import config from '../config'
import PropTypes from 'prop-types'

export default class Note extends React.Component {
  static contextType = NotesContext
  static defaultProps = {
    onDeleteNote: () => {}
  }

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
      method: 'DELETE',
    })
    .then(res => {
      console.log(res.ok)
      if(!res.ok)
        return res.json().then(e => Promise.reject(e))
        console.log(res.ok)
      return res.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.onDeleteNote(noteId)
      console.log("function check")
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    const {name, id, modified} = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={this.handleClickDelete}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {modified?format(new Date(modified), 'Do MMM yyyy'):'invalid data'}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func
}