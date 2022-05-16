import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import AddComment from '../Components/AddComment';
import Comment from '../Components/Comment';

const ViewBlog = () =>
{
    const [post, setPost] = useState({ comments: [{ date: new Date }], dateSubmitted: new Date()});
    const { postId } = useParams();

    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios.get(`/api/blog/getpost?postId=${postId}`);
            setPost(data);
        }
        getPost();

    });

    const { title, dateSubmitted, text, comments } = post;
    return ( <div>
            <div className="row">
                <div className="col-lg-8">
                    <h1 className="mt-4">{title}</h1>
                    <p className="lead">
                        by
                        <Link to="#"> Yocheved Rochel Wajsbort</Link>
                    </p>
                <p>Posted on {format(new Date(dateSubmitted), 'EEEE LLLL do, R')}</p>
                <p>{text}</p>
                <AddComment postId={postId} />
                {comments.map((c) => <Comment comment={c} />)}
                </div>
            </div>
        </div>
    )
}
export default ViewBlog;