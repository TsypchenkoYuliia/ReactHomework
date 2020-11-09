import '../App.css';
import {useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import BackBtn from '../components/BackBtn';
import * as moment from 'moment';
import logo1 from '../image/1.png'; 
import logo2 from '../image/2.png'; 



function Question ()
{
        let {id} = useParams();
        let data = new Object();

        const[answers, new_answers] = useState('');

    function QuestionList()
    {

        const profile = JSON.parse(localStorage.getItem('questions'));
    
            profile.forEach(element => {
                if(element.id==id)
                {
                    data = element;
                }
            });

        if(data === undefined || data.answers === null)
            return (<div></div>);
        const content = data.answers.map((post) =>
          <div key={post.id} className='boxes'>
              <div>
                <div>{post.author===""?"Anonymous":post.author}: </div>
            </div>
            <div>
                <div>{post.text}</div>
            </div>
          </div>
        
        );

        function AddVotes()
        {
            const profile = JSON.parse(localStorage.getItem('questions'));
            profile.forEach(element => {
                if(element.id==id)
                {
                    const updatedData = element;
                    updatedData.votes = parseInt(updatedData.votes)+1;
                    Object.keys(updatedData).forEach((key) => {
                        profile[key] = updatedData[key];
                    });
                    new_answers(updatedData);
                }
            });
            localStorage.setItem("questions", JSON.stringify(profile));      
            
        }

        function SubVotes()   
        {
            const profile = JSON.parse(localStorage.getItem('questions'));
            profile.forEach(element => {
                if(element.id==id)
                {
                    const updatedData = element;
                    if(parseInt(updatedData.votes) === 0)
                    {
                       
                        return;
                    }
                    updatedData.votes = parseInt(updatedData.votes)-1;
                    Object.keys(updatedData).forEach((key) => {
                        profile[key] = updatedData[key];
                    });
                    new_answers(updatedData);
                }
            });
            localStorage.setItem("questions", JSON.stringify(profile));   
            
        }

        return(<div><span className='data'>question asked: <span className='datatext'>{moment(data.time).format('DD-MM-YYYY HH-MM')}, </span></span>
            <span className='data'> views: <span class='datatext'>{data.views}</span></span>
            <div className='answerbox'>
                <div className='votesans'>
                    <div onClick={() => AddVotes()}><img src={logo1}></img></div>
                    <div>{data.votes}</div>
                    <div className='pm'>vots</div>
                    <div onClick={() => SubVotes()}><img src={logo2}></img></div>
                </div>
                <div className='bm'>
            <div className='answertitle'>{data.title}</div>
            <div className='answerquest'>Question: {data.question}</div>
            <div className='answerquest text'>Answers: </div>
            <div className='anscontainer'>{content}</div></div>
            </div></div>);
    }

    function AddAnswer()
    {
        const[text, new_text] = useState('');
        const[author, new_author] = useState('');

        const changeAuthor = (e)=>{
            new_author(e.target.value);
           };
    
        const changeText = (e)=>{
            new_text(e.target.value);
           };

           const save = (e)=>{

        let answers = data.answers;
    
        if(text==="" || author==="")
        {
            alert("Fill in the text and author!");
            return;
        }

        var item = {
                "id": answers.length+1,
                "text": text,
                "author": author,
                questionId:id
              };
    
              data.answers.push(item);
    
              UpdateVotes(data);
           };

           function UpdateVotes(data)
        {
        
           const profile = JSON.parse(localStorage.getItem('questions'));
   
           profile.forEach(element => {
               if(element.id==id)
               {
                   const updatedData = element;
                   updatedData.answers = data.answers;
                   Object.keys(updatedData).forEach((key) => {
                       profile[key] = updatedData[key];
                   });
               }
           });

           localStorage.setItem("questions", JSON.stringify(profile));    
           
           new_answers(data.answers);
       }

        return(<div className='App-container'>
            
        <form>
        <div>Your answer:</div>
            <label/>Text
            <textarea type='text' value={text} onChange={changeText} id='anstitle' required='required'/>
            <label/>Your name:
            <input type='text' value={author} onChange={changeAuthor} id='author'/>
            <input type='button' onClick={save} value='Post' id='save'/>
        </form>
    </div>);
    }

    return (<div><BackBtn></BackBtn><QuestionList></QuestionList><AddAnswer></AddAnswer></div>);
}

export default Question;