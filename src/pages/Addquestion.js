
import {useHistory} from 'react-router-dom'
import { useState,useEffect } from 'react';
import '../App.css';
import BackBtn from '../components/BackBtn';

function Addquestion ()
{
    let history = useHistory();

    useEffect(() => {

        let questions = JSON.parse(localStorage.getItem("questions"));

        if(questions=== null || questions.length == 0 )
        {
            questions = [];
            var item = {
                "id":1,
                "title": "Testtitle",
                "question": "Testtitle",
                "author": "Testtitle",
                "answers":[],
                "views":0,
                "votes":0,
                "time":new Date()
              };
    
            questions.push(item);
            localStorage.setItem("questions", JSON.stringify(questions));
        }
      });

    const[title, new_title] = useState('');
    const[question, new_question] = useState('');
    const[author, new_author] = useState('');

    const changeTitle = (e)=>{
        new_title(e.target.value);
       };

    const changeQuestion = (e)=>{
        new_question(e.target.value);
       };

    const changeAuthor = (e)=>{
        new_author(e.target.value);
       };


    const save = (e)=>{

        let questions = JSON.parse(localStorage.getItem("questions"));

        var item = {
            "id": questions.length+1,
            "title": title,
            "question": question,
            "author": author,
            "answers":[],
            "views":0,
            "votes":0,
            "time":new Date()
          };

          addItemToLocalStorage(item);
       };
    
    function addItemToLocalStorage(item) { 
        
        if(item.title==="" || item.question==="")
        {
            alert("Fill in the title and question!");
            return;
        }

        let questions = JSON.parse(localStorage.getItem("questions"));
        questions.unshift(item);
        
        localStorage.setItem("questions", JSON.stringify(questions));
        var res = JSON.parse(localStorage.getItem("questions"));

        history.push('/home');
    }

    return (<div><BackBtn></BackBtn><div className='App-container'>
        <form>
            <label/>Title
            <input type='text' value={title} onChange={changeTitle} id='title' required='required'/>
            <label/>Question
            <textarea type='text' value={question} onChange={changeQuestion} id='question' required='required'/>
            <label/>Your name:
            <input type='text' value={author} onChange={changeAuthor} id='author'/>
            <input type='button' onClick={save} value='Save' id='save'/>
        </form>
    </div></div>);
}

export default Addquestion;