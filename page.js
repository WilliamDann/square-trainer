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

async function loadUserFromCookie() {
    let token = null;
    if (document.cookie)
        token = document.cookie.split('=')[1]

    if (!token)
        return null;

    const query = `{ getUserByToken(token:"${token}") { username } }`
    sendQuery(query).then(data => {
        if (data.getUserByToken) {
            document.querySelector('#signin').innerHTML = data.getUserByToken.username;
            document.querySelector('#signin').href      = "#";
        }
    });
}

if (document.cookie)
    loadUserFromCookie()
