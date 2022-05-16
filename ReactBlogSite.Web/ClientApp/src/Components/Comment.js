import React from 'react';
import format from 'date-fns/format';

const Comment = ({ comment }) => {
    const { commentatorName, date, text } = comment;
    return (
        <div className="media mb-4">
            <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
            <div className="media-body">
                <h5 className="mt-0">
                    {commentatorName}
                    <small> {format(new Date(date), 'EEEE LLLL do, R')}</small>
                </h5>
                {text}
            </div>
        </div>
        )
}

export default Comment;