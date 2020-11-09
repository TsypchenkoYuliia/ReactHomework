import {useHistory} from 'react-router-dom'
import '../App.css';


function AskBtn()
{
    let history = useHistory();

    const gotoNewQuestions = () => {
    history.push('/addquestion');
   };

    return (<div className='App-container'><button id='askbtn' onClick={gotoNewQuestions}>Ask Question</button></div>);
}

export default AskBtn;