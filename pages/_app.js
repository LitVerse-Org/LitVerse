import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Amplify from 'aws-amplify';
import awsExports from '../aws-exports';  // Replace with the correct path to your aws-exports.js file

TimeAgo.addDefaultLocale(en);


// Keep the below code commented out, as it will cause an error when you run the app. We'll uncomment it later if I can ever figure out this .configure() bug.
// console.log(Amplify);  // Should output the Amplify object
// console.log(awsExports);  // Should output your AWS settings
// Amplify.configure({ ...awsExports, ssr: true });  // Use awsExports here

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
