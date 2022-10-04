import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuotes = () => {
    const history = useHistory();
    const { sendRequest, status } = useHttp(addQuote);

    useEffect(() => {
        if (status === 'completed') {
            history.push('/quotes');
        }
    }, [history, status])

    const addQuoteHandler = (data) => {
        sendRequest(data);

        history.push('/quotes');
    }
    return ( <
        QuoteForm isLoading = { status === 'pending' }
        onAddQuote = { addQuoteHandler }
        />
    );
}

export default NewQuotes;