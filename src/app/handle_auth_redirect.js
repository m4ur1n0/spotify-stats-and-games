export async function handleAuthRedirect() {
    // get query parameters (code) from the url bar
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) { // if not code, just return, fail, etc. doesn't matter
        try {
            // call the API route HERE
            const response = await fetch(`/api/auth/callback?code=${code}`);
            const data = await response.json();

            if (response.ok) {
                // store tokens locally
                localStorage.setItem('spotify_access_token', data.access_token);
                localStorage.setItem('spotify_refresh_token', data.refresh_token);

                // may as well throw user data in there too ;)
                localStorage.setItem('user_data', JSON.stringify(data.user));

                // NOW we can actually redirect to profile
                window.location.href = `/profile?user=${encodeURIComponent(JSON.stringify(data.user))}`;

            } else {
                console.error("ERROR DURING AUTH! got bad response : ", JSON.stringify(data.error));
                window.location.href = "/"; // just redirect back to login :'P
            }

        } catch (err) {
            console.error("Error ocurred during redirect/failed to authenticate : ", err);

        }

    }
}