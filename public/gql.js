async function sendQuery(query, variables={}) {
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: variables
        })
    });

    const json = await response.json();

    return json.data;
};