import React, { useState } from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const [post, setPost] = useState({ title: '', text: '', dateSubmitted: new Date(), comments: []});
    const history = useHistory();

    const onTextChange = e => {
        const newPost = produce(post, draft => {
            draft[e.target.name] = e.target.value;
        });
        setPost(newPost)
    }

    const onSubmitClick = async () => {
        await axios.post('/api/blog/addpost', post);
        history.push('/mostrecent');
    }
    const { title, text } = post;
    return (<main role="main" className="pb-3">
        <div className="row">
            <div className="col-md-8 offset-md-2 jumbotron">
                <input type="text" onChange={onTextChange} value={title} className="form-control" placeholder="Title" name="title" />
                    <br />
                <textarea name="text" onChange={onTextChange} value={text} placeholder="What's on your mind?" className="form-control" rows="20"></textarea>
                    <br />
                <button className="btn btn-primary" onClick={onSubmitClick}>Submit Post!</button>
            </div>
        </div>
    </main>
        )
}
export default Admin;