import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Home from './components/layout/Home'

class App extends Component {
    render() {
        return (
            <div>
                <h2>My Awesome React App</h2>
                <Home />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
