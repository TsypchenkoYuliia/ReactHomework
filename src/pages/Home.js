
import '../App.css';
import AskBtn from '../components/AskBtn'
import * as moment from 'moment'
import {useHistory} from 'react-router-dom'
import {Link } from 'react-router-dom'
import { useState } from 'react';


function Home ()
{
    const[collection, setCollection] = useState('');

    function UpdateVotes(id)
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
            }
        });
        localStorage.setItem("questions", JSON.stringify(profile));

        setCollection(JSON.parse(localStorage.getItem('questions')));
    }

    function UpdateViews(id)
    {
        const profile = JSON.parse(localStorage.getItem('questions'));

            profile.forEach(element => {
            if(element.id==id)
            {
                const updatedData = element;
                updatedData.views = parseInt(updatedData.views)+1;
                Object.keys(updatedData).forEach((key) => {
                    profile[key] = updatedData[key];
                });
            }
        });
        localStorage.setItem("questions", JSON.stringify(profile));
    }

    function Blog(props) {
        if(props.posts === null)
            return (<div></div>);
        const content = props.posts.map((post) =>
          <div key={post.id} className='boxcard'>
            <div className='votes' onClick={() => UpdateVotes(post.id)}>
                <div>{post.votes}</div>
                <label>Vots</label>
            </div>
            <div className='answers'>
                <div>{post.answers.length}</div>
                <label>Answers</label>
            </div>
            <div className='views'>
                <div>{post.views}</div>
                <label>Views</label>
            </div>
            <div className='titlebox'>
                <Link to={"/question/"+ post.id} className='title' onClick={() => UpdateViews(post.id)}>{post.title}</Link>
                <div className='timebox'>
                <span className='time'> question asked {moment(post.time).format('DD-MM-YYYY HH-MM')}, author: </span><br></br>
                    <span className='author'> {post.author===""? "Anonymous": post.author}</span>
                </div>
            </div>
          </div>
        
        );
        return (<div className='boxsmall'>{content}</div>);
      }
      
      const questions = JSON.parse(localStorage.getItem("questions"));
        if(questions !== null)
        {
            questions.splice(questions.length-1, 1);
        }


    return (<div><AskBtn></AskBtn>
        <Blog posts={questions}></Blog></div>);
}

export default Home;