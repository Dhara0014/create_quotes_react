import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { Fragment, useEffect } from "react";

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
    const match = useRouteMatch();
    const params = useParams();
    const { id } = params;

    const { sendRequest, status, data: loadQuotes, error } = useHttp(getSingleQuote);

    useEffect(() => {
        sendRequest(id)
    }, [sendRequest, id]);

    if (status === 'pending') {
        return <div className = "centered" >
            <
            LoadingSpinner / >
            <
            /div>
    }

    if (error) {
        return <p className = "centered" > { error } < /p>
    }

    if (!loadQuotes) {
        return <p > No Quote Found.. < /p>
    }
    return ( <
        Fragment >
        <
        HighlightedQuote text = { loadQuotes.text }
        author = { loadQuotes.author }
        /> <
        Route path = { `${match.path}` }
        exact >
        <
        div className = "centered" >
        <
        Link className = "btn--flat"
        to = { `${match.url}/comments` } > Load Comments < /Link> <
        /div> <
        /Route> <
        Route path = { `${match.path}/comments` } >
        <
        Comments / >
        <
        /Route> <
        /Fragment>
    )
}


export default QuoteDetails;