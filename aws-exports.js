// aws-exports.js

const awsmobile = {
    aws_project_region: 'us-east-1', // make sure aligns with AWS region for the buckets
    aws_s3_buckets: {
        profilePicsBucket: 'litverse-profile-pics-bucket',
        postImagesBucket: 'litverse-post-img-bucket',
        postVideosBucket: 'litverse-post-video-bucket',
        profileBackgroundImgBucket: 'litverse-profile-background-img-bucket',
        profileCoverImgBucket: 'litverse-profile-cover-img-bucket',
    },
};

export default awsmobile;
