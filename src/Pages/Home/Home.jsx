import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import SinglePost from '../../Components/SinglePost/SinglePost';
import { db } from '../../firebase.config';

export default function Home() {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts');
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef)
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getPosts();
  }, [postList])

  const deletePost = async (id) => {
    const confirmation = window.confirm('Are you sure? Once you delete this post you can not recover this. Do you want to delete this post?');
    if (confirmation) {
      const postDoc = doc(db, 'posts', id)
      await deleteDoc(postDoc);
    }
  }

  return (
    <div className='p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {
        postList.reverse().map((post) => <SinglePost post={post} key={post.id} deletePost={deletePost} />)
      }
    </div>
  )
}
