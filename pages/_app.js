import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

// Import Amplify and your AWS configuration
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports'; // Replace with the correct path to your aws-exports.js file

TimeAgo.addDefaultLocale(en);

// Configure Amplify with your AWS settings
Amplify.configure(awsmobile);
console.log(awsmobile.aws_project_region); // Example: 'us-east-1'
console.log(awsmobile.aws_s3_buckets.profilePicsBucket); // Example: 'litverse-profile-pics-bucket'

function MyApp({
                   Component,
                   pageProps: { session, ...pageProps },
               }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
