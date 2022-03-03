import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDetails from '../pages/userDetails/UserDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={UserDetails} />
        <Route exact path='/details' component={UserDetails} />
      </Switch>
    </Router>
  );
}

export default App;
