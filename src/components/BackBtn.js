import {useHistory} from 'react-router-dom'
import '../App.css';


function BackBtn()
{
    let history = useHistory();

    const gotoHome = () => {
    history.push('/home');
   };

    return (<div className='App-container'><button id='askbtn' onClick={gotoHome}>Back</button></div>);
}

export default BackBtn;