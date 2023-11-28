const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Assuming you named your API endpoint /api/userOperations/updateProfile
        const response = await fetch('/api/userOperations/updateProfile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers your API might need
            },
            body: JSON.stringify({
                name: profileData.name,
                bio: profileData.bio,
                // Include other profile fields as necessary
                // If you're updating the password, make sure to include
                // both the current password and the new password
            }),
        });

        if (!response.ok) {
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            } else {
                throw new Error('Failed to update profile - Server responded with an error');
            }
        }

        const data = await response.json();
        console.log('Profile updated successfully', data);
        router.push('/profile'); // Redirect to the profile page or wherever is appropriate
    } catch (error) {
        // Handle network errors, server downtime, etc.
        console.error('An unexpected error occurred', error);
        // Optionally, update the state here to display the error message on the page
    }
};
