import { deleteDoc, doc, } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { auth, db } from '../../firebase.config';
import usePosts from '../../hooks/usePosts';

export default function Profile() {
  const [user] = useAuthState(auth);
  const [postList, setPostList] = usePosts();
  const navigate = useNavigate();
  const detailsPage = (id) => {
    navigate(`/blog/${id}`);
  }

  const deletePost = async (id) => {
    // const confirmation = window.confirm('Are you sure? Once you delete this post you can not recover this. Do you want to delete this post?');
    // if (confirmation) {

    //   alert('Post Deleted')
    // } else {
    //   alert('Your post is safe')
    // }

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const postDoc = doc(db, 'posts', id)
          deleteDoc(postDoc);
          const remaining = postList.filter(post => post.id !== id);
          setPostList(remaining);
          swal("Your post has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your post is safe!");
        }
      });
  }

  const filteredPost = postList.filter((post) => post.author.id === user.uid)

  return (
    <div className='p-5 md:p-10'>
      <p className='text-3xl text-slate-700 font-bold text-center pb-5 uppercase'>My Profile</p>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
        {
          filteredPost.reverse().map((post) => <div key={post.id} className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={post.photoUrl} alt="" /></figure>
            <div className='flex items-center gap-2 p-2'>
              <img className='rounded-full' width={30} height={30} src={post.author.authorImg} alt="" />
              <p className='flex flex-col text-sm flex-grow'>
                <span>Post Date : {post.postDate?.slice(0, 24)}</span>
                <span>Author : {post.author.name}</span>
              </p>
              {user.uid === post.author.id && <button onClick={() => deletePost(post.id)} title="Delete">&#128465;</button>}
            </div>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.postText.slice(0, 100)}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-link text-slate-700">Comments</button>
                <button className="btn" onClick={() => detailsPage(post.id)}>Read More &raquo;</button>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}
