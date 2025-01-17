/**
 * Ponto de entrada principal da aplicação React.
 * Renderiza o componente App dentro de um Provider do Redux e configura o Router.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { store } from './store';
import { Provider } from 'react-redux';

/**
 * Cria a raiz React e renderiza a aplicação.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
