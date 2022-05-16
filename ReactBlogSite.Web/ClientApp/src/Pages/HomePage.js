import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import PostDisplay from '../Components/PostDisplay';

const HomePage = () => {

    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);
    let { pageNumber } = useParams();
    if (!pageNumber) {
        pageNumber = 1;
    }
    useEffect(() => {
        const getPosts = async () => {
            const { data } = await axios.get(`/api/blog/getposts?pageNumber=${pageNumber}`);
            setPosts(data);
        }
        const getTotalPosts = async () => {
            const { data } = await axios.get(`/api/blog/GetTotalPosts`);
            setTotalPosts(data.total);
        }
        getPosts();
        getTotalPosts();
    }, [pageNumber]);

    return (
        <div className="col-md-8">
            <h1 className="my-4">
                The Most Awesome Blog
                <small>😉</small>
            </h1>
            {posts.map(p => <PostDisplay post={p} key={p.id}/>)}
            <ul className="pagination justify-content-center mb-4">
                {totalPosts / 3.0 > pageNumber && <li className="page-item">
                    <Link to={`/page/${+pageNumber + 1}`} className="page-link">&larr; Older </Link>
                </li>}               
                {pageNumber > 1 && <li className="page-item">
                    <Link to={`/page/${+pageNumber - 1}`} className="page-link">Newer &rarr;</Link>                                            
                </li>}
            </ul>
        </div>
    )
}

export default HomePage;