import React from 'react';
import axios from 'axios';
import './App.css'

class App extends React.Component {
  constructor() {
    console.log("Constructor running");
    super();
    this.state = {
      user: [],
      followers: []
    };
  }

  componentDidMount() {
    console.log("CDM running");
    axios
      .get('https://api.github.com/users/tremain-hebert')
      .then(res => {
        console.log(res.data);
        this.setState({user: res.data})
      })
      .catch(err => 
        console.log("there was an error", err));

    axios 
      .get('https://api.github.com/users/tremain-hebert/followers')
      .then(res => {
        console.log(res.data);
        this.setState({followers: res.data})
      })
      .catch(err =>
        console.log("there was an error", err));
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("CDU running");
    if (this.state.user !== prevState.user) {
      console.log("User on state has changed")
    }
  }

  render() {
    console.log("App component rendering");
    return (
      
      <div className="App">
        <div className="User">
          <h1>{this.state.user.login}</h1>
          <img src={this.state.user.avatar_url} />
        </div>
        {this.state.followers.map((followers) => (
          <div key={followers.id} className="followers">
            <h2>Followers</h2>
            <h3>{followers.login}</h3>
            <img src={followers.avatar_url} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;