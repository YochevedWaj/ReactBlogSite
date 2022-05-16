import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { useHistory } from 'react-router-dom';

const AddComment = ({ postId }) => {

    const [comment, setComment] = useState({commentatorName: '', text: ''});
    const history = useHistory();

    useEffect(() => {
        const setName = async () => {
            const { data } = await axios.get('/api/blog/gecommentatorname');
            setComment({ commentatorName: data.commentatorName });
        }
        setName();
    }, []);

    const onTextChange = e => {
        const newComment = produce(comment, draft => {
            draft[e.target.name] = e.target.value;
        });
        setComment(newComment)
        
    }

    const onSubmitClick = async () => {
        const { commentatorName, text } = comment;
        await axios.post('/api/blog/addcomment', { commentatorName, text, postId });
        setComment({ commentatorName, text: '' });
        history.push(`/viewblog/${postId}`);
    }

    const { commentatorName, text } = comment;
    
    return (<div className="card my-4">
        <h5 className="card-header">Leave a Comment:</h5>
        <div className="card-body">
            <div className="form-group">
                <input type="text" onChange={onTextChange} value={commentatorName} name='commentatorName' placeholder="Please enter your name" className="form-control" />
            </div>
            <div className="form-group">
                <textarea onChange={onTextChange} value={text} name='text' placeholder="Type your comment here but remember to be be nice..." className="form-control" rows="3"></textarea>
            </div>
            <button disabled={!(commentatorName && text)} className="btn btn-primary" onClick={onSubmitClick}>Submit</button>
        </div>
    </div>
        )
}

export default AddComment;