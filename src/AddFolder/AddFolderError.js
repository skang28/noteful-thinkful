import React from 'react'

export default class AddFolderError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
          return (
            <h2>Could not add this folder.</h2>
          );
        }
        return this.props.children;
      } 
}