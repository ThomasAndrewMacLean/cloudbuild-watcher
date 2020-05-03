import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return <h1>Hello World</h1>;
};

ReactDOM.render(
    React.createElement(App, {}, null),
    document.getElementById('react-inject')
);
