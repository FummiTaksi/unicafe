import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {

    constructor() {
        super();
    }
    render () {
        return (
            <div>
                <h2>Anna palautetta</h2>
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
