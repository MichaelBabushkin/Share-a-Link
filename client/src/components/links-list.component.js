import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import your fontawesome library
import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast.error("Link removed successfully!", { 
  // Set to 15sec 
  position: toast.POSITION.BOTTOM_LEFT});

const LinkUrl = props => (
  
  <tr>
    <td>{props.link.username}</td>
    <td>{props.link.description}</td>
    <td>{props.link.genre}</td>
    <td><a href={props.link.url} target="_blank" rel="noopener noreferrer">{props.link.url}</a></td>
    <td>{props.link.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.link._id}><i className="fa fa-edit"/></Link> | <a href="#" onClick={(e) => { props.deleteLink(props.link._id);notify()}}><i className="fa fa-trash"/></a>
    </td>
  </tr>
)

export default class LinksList extends Component {
  constructor(props) {
    super(props);

    this.deleteLink = this.deleteLink.bind(this)

    this.state = {links: []};
  }

  componentDidMount() {
    // axios.get('http://localhost:5000/links/')
    axios.get('/links/')
      .then(response => {
        this.setState({ links: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteLink(id) {
   
    // axios.delete('http://localhost:5000/links/'+id)
    axios.delete('/links/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      links: this.state.links.filter(el => el._id !== id)
    })

  }

  linkList() {
    return this.state.links.map(currentlink => {
      return <LinkUrl link={currentlink} deleteLink={this.deleteLink} key={currentlink._id}/>;
    })
  }

  render() {
  
    return (
      <div>
        <h3>Shared Links</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Shared By</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Link</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.linkList() }
          </tbody>
        </table>
        <ToastContainer />
      </div>
    )
  }
}