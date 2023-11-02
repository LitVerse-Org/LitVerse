List of API calls that we will need.
Please add/change it as you add/change things elsewhere.


#### Search Operations (/api/searchOperations/...)
- [GET /api/searchUsers/[query].js](./src/pages/api/searchOperations/searchUsers/[query].js): Search for users by username
- [GET /api/searchCommunities/[query].js](./src/pages/api/searchOperations/searchCommunities/[query].js): Search for communities by name
- [GET /api/searchPosts/[query].js](./src/pages/api/searchOperations/searchPosts/[query].js): Search for posts by title
- [GET /api/searchTags/[query].js](./src/pages/api/searchOperations/searchTags/[query].js): Search for posts by tag
- STRETCH FEATURE
    - [GET /api/searchAll/[query].js](./src/pages/api/searchOperations/searchAll/[query].js): Search for users, communities, posts, and tags by query
        - USE THIS TO IMPLEMENT A UNIFIED SEARCH BAR, RATHER THAN USERS SPECIFYING WHAT THEY'RE SEARCHING FOR VIA A DROPDOWN MENU.
        - This will require some extra backend development to work. Maybe use Elastisearch or something.

#### User Operations (/api/userOperations/...)
- [POST /api/users/registrationHandler](./src/pages/api/userOperations/registrationHandler.js): Create a new user
- [POST /api/users/loginHandler](./src/pages/api/userOperations/loginHandler.js): Authenticate a user
- [GET /api/users/getUser](./src/pages/api/userOperations/getUser.js): Retrieve authenticated user's info
- [GET /api/users/getUser/[id].js](./src/pages/api/userOperations/getUser/[id].js): Retrieve a single user by ID
- [PUT /api/users/updateUser](./src/pages/api/userOperations/updateUser.js): Update authenticated user's info
- [DELETE /api/users/deleteUser](./src/pages/api/userOperations/deleteUser.js): Delete authenticated user
- [POST /api/users/changeUsername](./src/pages/api/userOperations/changeUsername.js): Allow users to change their username
- [POST /api/users/changePassword](./src/pages/api/userOperations/changePassword.js): Allow users to change their password
- [POST /api/users/changeProfilePicture](./src/pages/api/userOperations/changeProfilePicture.js): Allow users to change their profile picture
- [POST /api/users/changeCoverPhoto](./src/pages/api/userOperations/changeCoverPhoto.js): Allow users to change their cover photo
- [POST /api/users/changeEmail](./src/pages/api/userOperations/changeEmail.js): Allow users to change their email
- [POST /api/users/changeBio](./src/pages/api/userOperations/changeBio.js): Allow users to change their bio
- [POST /api/users/changeBanner](./src/pages/api/userOperations/changeBanner.js): Allow users to change their banner art
- [GET /api/users/isAuthenticated](./src/pages/api/userOperations/isAuthenticated.js): Check if the user is authenticated
- [GET /api/users/isAuthorized/[action].js](./src/pages/api/userOperations/isAuthorized/[action].js): Check if the user is authorized to perform a specific action
- [GET /api/getNotifications](./src/pages/api/userOperations/getNotifications.js): Retrieve the latest notifications for the authenticated user
- [POST /api/markNotificationRead](./src/pages/api/userOperations/markNotificationRead.js): Mark a notification as read

#### Post Operations (/api/postOperations/...)
- [POST /api/createPost](./src/pages/api/postOperations/createPost.js): Create a new post
- [POST /api/uploadMedia](./src/pages/api/postOperations/uploadMedia.js): Upload media (images, videos) to a post
- [DELETE /api/deleteMedia/[id].js](./src/pages/api/postOperations/deleteMedia/[id].js): Delete specific media
- [POST /api/uploadMediaToS3](./src/pages/api/postOperations/uploadMediaToS3.js): Upload media (images, videos) to S3 for a post
- [DELETE /api/deleteMediaFromS3/[id].js](./src/pages/api/postOperations/deleteMediaFromS3/[id].js): Delete specific media from S3
- [PUT /api/updatePost/[id].js](./src/pages/api/postOperations/updatePost/[id].js): Update a post by ID
- [DELETE /api/deletePost/[id].js](./src/pages/api/postOperations/deletePost/[id].js): Delete a post by ID
- [GET /api/getAllFollowedPosts](./src/pages/api/postOperations/getAllFollowedPosts.js): Retrieve all posts from people and communities you follow
    - Usage: Home Feed Page
- [GET /api/getUsersPosts](./src/pages/api/postOperations/getUsersPosts.js)
    - Usage: Profile Page. To get all of a single user's posts.
- [GET /api/getRecommendedPosts](./src/pages/api/postOperations/getRecommendedPosts.js)
    - Usage: Discover Feed Page. To get activity-relevant posts from people you don't follow.
- [GET /api/getSinglePost/[id].js](./src/pages/api/postOperations/getSinglePost/[id].js): Retrieve a single post by ID
- [GET /api/getPostsByTag/[tag].js](./src/pages/api/postOperations/getPostsByTag/[tag].js): Retrieve all posts by tag

#### Communities Operations (/api/communityOperations/...)
- [POST /api/createCommunity](./src/pages/api/communityOperations/createCommunity.js): Create a new community
- [PUT /api/updateCommunity/[id].js](./src/pages/api/communityOperations/updateCommunity/[id].js): Update a community by ID
- [DELETE /api/deleteCommunity/[id].js](./src/pages/api/communityOperations/deleteCommunity/[id].js): Delete a community by ID
- [POST /api/followCommunity/[id].js](./src/pages/api/communityOperations/followCommunity/[id].js): Join a community by ID
- [DELETE /api/unfollowCommunity/[id].js](./src/pages/api/communityOperations/unfollowCommunity/[id].js): Leave a community by ID
- [GET /api/getAllFollowedCommunities](./src/pages/api/communityOperations/getAllFollowedCommunities.js): Retrieve all communities you are a part of
- [GET /api/getRecommendedCommunities](./src/pages/api/communityOperations/getRecommendedCommunities.js): Retrieve communities you might be interested in
- [GET /api/getCommunity/[id].js](./src/pages/api/communityOperations/getCommunity/[id].js): Retrieve a single community by ID


#### Like Operations (/api/likeOperations/...)
- [POST /api/likePost](./src/pages/api/likeOperations/likePost.js): Like a post
- [DELETE /api/unlikePost/[id].js](./src/pages/api/likeOperations/unlikePost/[id].js): Unlike a post
- [GET /api/getLikedPosts/[id].js](./src/pages/api/likeOperations/getLikedPosts/[id].js): Get all liked posts
- [GET /api/getLikeCount/[id].js](./src/pages/api/likeOperations/getLikeCount/[id].js): Get total current likes for a post.

#### Follow Operations (/api/followOperations/...)
- [POST /api/follow](./src/pages/api/followOperations/follow.js): Follow a user
- [DELETE /api/follow/[id].js](./src/pages/api/followOperations/follow/[id].js): Unfollow a user
- [GET /api/getFollowers/[id].js](./src/pages/api/followOperations/getFollowers/[id].js): Get all followers
- [GET /api/getFollowing/[id].js](./src/pages/api/followOperations/getFollowing/[id].js): Get all following
- [GET /api/getFollowerCount/[id].js](./src/pages/api/followOperations/getFollowerCount/[id].js): Get total current followers for a user
- [GET /api/getFollowingCount/[id].js](./src/pages/api/followOperations/getFollowingCount/[id].js): Get total current following for a user

#### UI Customization Operations (/api/uiCustomizationOperations/...)
- [POST /api/users/changeTheme](./src/pages/api/uiCustomizationOperations/changeTheme.js): Allow users to change to a preset theme
- [POST /api/users/changePrimaryColor](./src/pages/api/uiCustomizationOperations/changePrimaryColor.js): Allow users to change their primary color
- [POST /api/users/changeSecondaryColor](./src/pages/api/uiCustomizationOperations/changeSecondaryColor.js): Allow users to change their secondary color
- [POST /api/users/changeBackgroundImage](./src/pages/api/uiCustomizationOperations/changeBackgroundImage.js): Allow users to change their background image
- [POST /api/users/changeBackgroundColor](./src/pages/api/uiCustomizationOperations/changeBackgroundColor.js): Allow users to change their background color
- [POST /api/users/changeFont](./src/pages/api/uiCustomizationOperations/changeFont.js): Allow users to change their font
- [POST /api/users/changeFontColor](./src/pages/api/uiCustomizationOperations/changeFontColor.js): Allow users to change their font color

#### Analytics (/api/analyticsOperations/...)
- [GET /api/getPostAnalytics/[id].js](./src/pages/api/analyticsOperations/getPostAnalytics/[id].js): Retrieve analytics for a specific post (like views, engagement, etc.)
- [GET /api/getUserAnalytics](./src/pages/api/analyticsOperations/getUserAnalytics.js): Retrieve analytics for the authenticated user's account

#### Miscellaneous (/api/miscOperations/...)
- [GET /api/getTrendingTags](./src/pages/api/miscOperations/getTrendingTags.js): Retrieve tags that are currently trending
- [GET /api/getLatestPosts](./src/pages/api/miscOperations/getLatestPosts.js): Retrieve the latest posts across the platform
- [GET /api/getTopPosts](./src/pages/api/miscOperations/getTopPosts.js): Retrieve the most-liked or most-viewed posts across the platform