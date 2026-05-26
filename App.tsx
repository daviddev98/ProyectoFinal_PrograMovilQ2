import React from 'react';
import { registerRootComponent } from 'expo';
import Login from './src/screens/Login';

function App() {
  return <Login />;
}

registerRootComponent(App); 

export default App;