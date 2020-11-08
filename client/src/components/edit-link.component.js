import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './edit-link.css';

export default class EditLink extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      genre: '',
      url: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    // axios.get('http://localhost:5000/links/'+this.props.match.params.id)
    axios.get('/links/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          genre: response.data.genre,
          url: response.data.url,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    // axios.get('http://localhost:5000/users/')
    axios.get('/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value
    })
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const link = {
      username: this.state.username,
      description: this.state.description,
      genre: this.state.genre,
      url: this.state.url,
      date: this.state.date
    }

    console.log(link);

    // axios.post('http://localhost:5000/links/update/' + this.props.match.params.id, link)
    axios.post('/links/update/' + this.props.match.params.id, link)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    let genres = ['Stand Up','Funny Video','Series to Watch','Movies','Tutorials','News','Articles'];

    const notify = () => toast.success("Changes saved successfully!", { 
      // Set to 15sec 
      position: toast.POSITION.BOTTOM_LEFT});
    return (
    <div className ="edit-bg" >
      <h3>Edit Link</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group"> 
          <label>Genre: </label>
          <select ref="userInput"
              required
              className="form-control"
              defaultValue={'Stand Up'}
              value={this.state.genre}
              onChange={this.onChangeGenre}>
              {
               genres.map((genre,i) => {
                  return <option 
                    key={i}
                    value={genre}>{genre}
                    </option>;
                })
              }
            </select>
        </div>
        <div className="form-group">
          <label>Link: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.url}
              onChange={this.onChangeUrl}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Finish Editing" className="btn btn-primary" onClick={notify} />
          <ToastContainer />
        </div>
      </form>
    </div>
    )
  }
}