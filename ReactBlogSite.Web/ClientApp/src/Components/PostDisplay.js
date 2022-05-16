import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';
import format from 'date-fns/format';

const PostDisplay = ({ post }) => {
    const { id, title, text, dateSubmitted } = post;

    return (  <div key={id} className="card mb-4">
            <div className="card-body">
                <h2 className="card-title">
                    <Link to={`/viewblog/${id}`}>{title}</Link>
                </h2>
                <p className="card-text">{text.length < 200 ? text : `${text.substring(0, 200)}.....`}</p>
                <Link to={`/viewblog/${id}`} className="btn btn-primary">Read More &rarr;</Link>
            </div>
            <div className="card-footer text-muted">
                Posted on {format(new Date(dateSubmitted), 'EEEE LLLL do, R')} by
                <a href="#"> Yocheved Rochel Wajsbort</a>
            </div>
        </div>)

}
export default PostDisplay;