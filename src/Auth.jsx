import React from "react";
import Axios from "axios";

const API_URL = `http://localhost:8080`;

class Auth extends React.Component {
  state = {
    selectedFile: null,
    file: "",
    fileNames: "",
    formUser: {
      username: "",
      email: "",
      password: "",
    },
    loginState: {
      username: "",
      email: "",
      password: "",
      profilePicture: "",
    },
  };

  inputHandler = (event, key) => {
    const { value } = event.target;

    this.setState({
      formUser: {
        ...this.state.formUser,
        [key]: value,
      },
    });
  };

  registerHandler = () => {
    console.log("Register!");
    Axios.post(`${API_URL}/users`, {
      username: this.state.formUser.username,
      password: this.state.formUser.password,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loginHandler = () => {
    alert("Login!");
    Axios.post(`${API_URL}/documents/login`, this.state.formUser)
      .then((res) => {
        console.log(res.data);
        this.setState({ loginState: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // loginHandler = () => {
  //   const { username, password } = this.state.formUser;
  //   alert("Login!");
  //   Axios.get(`${API_URL}/users/login`, {
  //     params: {
  //       username: username,
  //       password: password,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  fileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  fileUploadHandler = () => {
    let formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("userData", JSON.stringify(this.state.formUser));

    Axios.post(`${API_URL}/documents`, formData)
      .then((res) => {
        console.log(res.data);
        this.setState({ file: res.data });
        let fileName = this.state.file.split("/")[5];
        this.setState({ fileNames: fileName });
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
      });

    console.log(this.state.formUser);
    console.log(JSON.stringify(this.state.formUser));
  };

  download = () => {
    window.open(`${API_URL}/documents/download/tower.png`);
  };

  render() {
    return (
      <div>
        <h1>Auth Screen</h1>

        <h5>Username</h5>
        <input type="text" onChange={(e) => this.inputHandler(e, "username")} />
        <h5>Email</h5>
        <input type="text" onChange={(e) => this.inputHandler(e, "email")} />
        <h5>Password</h5>
        <input type="text" onChange={(e) => this.inputHandler(e, "password")} />

        <br />

        <input type="button" value="Login" onClick={this.loginHandler} />
        <input type="button" value="Register" onClick={this.registerHandler} />
        <br />
        <input type="file" onChange={this.fileChangeHandler} />
        <input type="button" value="Upload" onClick={this.fileUploadHandler} />
        <br />
        <input type="button" value="Download" onClick={this.download} />
        <br />
        <div>
          <h2>{this.state.loginState.username}</h2>
          <img
            src={this.state.loginState.profilePicture}
            style={{ width: "50%", height: "100%" }}
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Auth;
