const initFacebookSdk = () => {
    return new Promise((resolve) => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '2254890361528509', // Replace with your App ID
                cookie: true,
                xfbml: true,
                version: 'v12.0',
            });

            resolve();
        };

        // Load the SDK script
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    });
};

export default initFacebookSdk;
