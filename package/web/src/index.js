import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import client from './plugins/apollo/client.js';
import 'bootstrap/dist/css/bootstrap.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <ApolloProvider client={client}>
            <App />
      </ApolloProvider>
);

