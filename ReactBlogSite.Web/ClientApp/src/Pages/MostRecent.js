import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MostRecent = () => {
    const history = useHistory();
    
    useEffect(() => {
        const redirect = async () => {
            const { data } = await axios.get('/api/blog/getmostrecentpostid');
            const { postID } = data;
            history.push(`/viewblog/${postID}`);
        }
        redirect();

    });
    return <h1>Loading....</h1>
}
export default MostRecent;