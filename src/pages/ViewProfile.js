// pages/viewprofile/[userId].js
import React from 'react';
import Layout from '../../components/Layout';
import ViewProfile from '../../components/ViewProfile/ViewProfile';

const ViewProfilePage = ({ userProfile }) => {
  return (
    <Layout>
      <ViewProfile userData={userProfile} />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  // Destructure userId from the URL parameters
  const { userId } = params;

  try {
    // Use your existing API endpoint to fetch the user data
    const response = await fetch(`http://localhost:3000/api/userOperations/getUser?userId=${userId}`);
    
    if (!response.ok) {
      // Handle any responses that aren't successful
      throw new Error(`Failed to fetch user with ID ${userId}`);
    }
    
    const userProfile = await response.json();
    return { props: { userProfile } }; // Pass userProfile as a prop to the page
  } catch (error) {
    console.error(error);
    // In case of an error, pass an error page or return props with an error message
    return { props: { userProfile: {}, error: error.message } };
  }
};

export default ViewProfilePage;
