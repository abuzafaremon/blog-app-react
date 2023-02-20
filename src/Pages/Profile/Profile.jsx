import { deleteDoc, doc, } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase.config';
import usePosts from '../../hooks/usePosts';

export default function Profile() {
  const [user] = useAuthState(auth);
  const [postList] = usePosts();

  const deletePost = async (id) => {
    const confirmation = window.confirm('Are you sure? Once you delete this post you can not recover this. Do you want to delete this post?');
    if (confirmation) {
      const postDoc = doc(db, 'posts', id)
      await deleteDoc(postDoc);
    }
    document.location.reload()
    alert('Post Deleted')
  }

  const filteredPost = postList.filter((post) => post.author.id === user.uid)

  return (
    <div className='p-10'>
      <p className='text-3xl text-slate-700 font-bold text-center pb-5 uppercase'>My Profile</p>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
        {
          filteredPost.reverse().map((post) => <div key={post.id} className="card card-compact bg-base-100 shadow-xl">
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
              <p>{post.postText}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-link text-slate-700">Comments</button>
                <button className="btn">Read More &raquo;</button>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}
