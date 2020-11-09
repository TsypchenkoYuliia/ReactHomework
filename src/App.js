
//import './App.css';
import {Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Addquestion from './pages/Addquestion'
import Question from './pages/Question'

function App() {
  return (
    <div className="App">
      

      <Switch>       
          <Route path="/home" exact>
            <Home />
          </Route> 
          <Route path="/addquestion" exact>
            <Addquestion />
          </Route> 
          <Route path="/question/:id" exact>
            <Question />
          </Route>         
          <Route path="*" exact>
            <Redirect to="/home" />
          </Route> 
      </Switch>

    </div>
  );
}

export default App;
