import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams();
    const { id } = params;

    const { sendRequest, status, data: loadComments } = useHttp(getAllComments);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);

    const addCommentHandler = useCallback(() => {
        sendRequest(id);
    }, [sendRequest, id]);

    let comments;
    if (status === 'pending') {
        comments = < div className = 'centered' > < LoadingSpinner / > < /div> 
    }

    if (status === 'completed' && (loadComments && loadComments.length > 0)) {
        comments = < CommentsList comments = { loadComments }
        />
    }

    if (status === 'completed' && (!loadComments || loadComments.length === 0)) {
        comments = < p className = 'centered' > No Comments yet!! < /p>
    }

    return ( < section className = { classes.comments } >
        <
        h2 > User Comments < /h2> {
            !isAddingComment && ( < button className = 'btn'
                onClick = { startAddCommentHandler } >
                Add a Comment <
                /button>
            )
        } {
            isAddingComment && < NewCommentForm id = { id }
            onAddComment = { addCommentHandler }
            />
        } { comments } <
        /section>
    );
};

export default Comments;