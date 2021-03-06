import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authSuccess, authFailed } from '../../redux/authentification/authActions';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Register = () => {
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated)
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated, history])

  const newRegister = (e) => {
    e.preventDefault()

    const data = {
      username: username,
      email: mail,
      password: password
    }

    fetch('https://my-pasteque-space.herokuapp.com/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response
      })
      .then(response => response.json())
      .then(response => {
        dispatch(authSuccess(response));
        history.replace('/')
      })
      .catch(error => {
        dispatch(authFailed())
        console.error(error)
      })
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
        <Breadcrumb.Item active>Créer un compte</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ marginTop: "30px" }}>
        <h1>Créer un compte</h1>
        <form onSubmit={newRegister}>
          <div className="form-group">
            <label htmlFor="pseudo">Pseudo</label>
            <input
              type="text"
              className="form-control"
              id="pseudo"
              placeholder="Choisissez votre pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mail">Adresse email</label>
            <input
              type="email"
              className="form-control"
              id="mail"
              placeholder="Entrez votre adresse email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Je crée mon compte !
        </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
