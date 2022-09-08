import React from 'react';
import * as api from './services/api';

function App() {
  return (
    <>
      {api.getCategories()}
    </>
  );
}

export default App;
