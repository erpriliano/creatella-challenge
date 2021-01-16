import React from 'react';
import { render } from 'react-dom';

import Home from './home';

const App = () => {
    return (
        <>
            <Home />
        </>
    );
};

render(<App />, document.getElementById('root'));
