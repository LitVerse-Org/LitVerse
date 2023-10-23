import React from 'react';
import styles from './ProfileHeader.module.css';

function ProfileHeader({ username, postCount }) {
  return (
    <div className={styles.profileHeader}>
      <h2>{username}</h2>
      <p>{postCount} posts</p>
     
    </div>
  );
}

export default ProfileHeader;
