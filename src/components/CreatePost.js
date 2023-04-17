import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { toast } from 'react-toastify';
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const [isdisabled, setIsDisabled] = useState(true);
  const posts = usePosts();

  const onChange = (e) => {
    setPost(e.target.value);

    if (e.target.value.trim().length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handleAddPostClick = async () => {
    setAddingPost(true);

    const res = await addPost(post);
    if (res.success) {
      setPost('');
      posts.addPostToState(res.data.post);
      toast.success('Post Created Successfully');
    } else {
      toast.error(res.message);
    }

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea value={post} onChange={onChange} />
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={isdisabled || addingPost}
        >
          {addingPost ? 'Adding Post' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
