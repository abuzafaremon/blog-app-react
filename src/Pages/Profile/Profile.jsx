import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase.config';

export default function Profile() {
  const [user] = useAuthState(auth);
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts');
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef)
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getPosts();
  }, [postList]);
  const deletePost = async (id) => {
    const confirmation = window.confirm('Are you sure? Once you delete this post you can not recover this. Do you want to delete this post?');
    if (confirmation) {
      const postDoc = doc(db, 'posts', id)
      await deleteDoc(postDoc);
    }
  }

  const filteredPost = postList.filter((post) => post.author.id === user.uid)
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5 p-10'>
      {
        filteredPost.map((post) => <div key={post.id} className="card card-compact bg-base-100 shadow-xl">
          <figure><img src={post.photoUrl} alt="" /></figure>
          <div className='flex items-center gap-2 p-2'>
            <img className='rounded-full' width={30} height={30} src={post.author.authorImg} alt="" />
            <p className='flex flex-col text-sm flex-grow'>
              <span>Post Date : {post.postDate?.slice(0, 24)}</span>
              <span>Posted By : {post.author.name}</span>
            </p>
            {user.uid === post.author.id && <button onClick={() => deletePost(post.id)} title="Delete">&#128465;</button>}
          </div>
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p>{post.postText.slice(0, 150)}</p>
            <div className="card-actions justify-end">
              <button className="btn">Read More</button>
            </div>
          </div>
        </div>)
      }
    </div>
  )
}
