import React from 'react';
import Image from 'next/image';
import styles from '../styles/redditCard.scss';

function ForumCard(props) {
  console.log(props.post)

  const postDate = props.post.timeStamp
  ? props.post.timeStamp.toDate().toLocaleString("en-ca", {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "Unknown date";
  console.log(postDate)
 
  return (
    <div className={`card mb-4 ${styles.redditCard}`}>
      <div className="d-flex align-items-center px-3 pt-3">
        <button className="btn btn-light btn-sm me-2">
          <i className="bi bi-arrow-up-circle"></i>
        </button>
        <span className="me-3">{props.post.upvotes}</span>
        <div className="text-muted">
          <small>
            Posted by <a href={`/user/${props.post.user}`}>u/{props.post.user}</a> in{' '}
            <a href={`/r/${props.post.subreddit}`}>r/{props.post.subreddit}</a> ·{' '}
            {postDate} ago
          </small>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.post.titre}</h5>
        <p className="card-text">{props.post.contenu}</p>
          <Image
            src={`/Images/${props.post.imageUrl}`}
            alt="Post image"
            width={500}
            height={300}
            className="img-fluid rounded"
          />
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <a href={`/post/${props.post.id}`} className="text-muted">
          <i className="bi bi-chat-dots me-1"></i> {props.post.comments} Comments
        </a>
        <button className="btn btn-outline-primary btn-sm">
          <i className="bi bi-share-fill"></i> Share
        </button>
        <button className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-bookmark"></i> Save
        </button>
      </div>
    </div>
  );
}

export default ForumCard;