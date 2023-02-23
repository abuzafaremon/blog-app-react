import { deleteDoc, doc, } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { auth, db } from '../../firebase.config';
import usePosts from '../../hooks/usePosts';
import deleteIcon from '../../assets/images/delete.png';
import edit from '../../assets/images/edit.png';
import TimeAgo from "timeago-react";

export default function Profile() {
  const [user] = useAuthState(auth);
  const [postList, setPostList] = usePosts();
  const navigate = useNavigate();
  const detailsPage = (id) => {
    navigate(`/blog/${id}`);
  }

  const deletePost = async (id) => {
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
                <span>{post.author.name}</span>
                <TimeAgo
                  datetime={`${post.currentDate} ${""} ${post.currentTime
                    }`}
                />
              </p>
              <div className="dropdown dropdown-left">
                <label tabIndex={0} className="font-extrabold text-2xl cursor-pointer bg-slate-200 px-1 rounded-full">&#8942;</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <button>
                      <img className='w-5' src={edit} alt="Edit" />
                      Edit
                    </button>
                  </li>
                  <li>
                    <button onClick={() => deletePost(post.id)}>
                      <img className='w-5' src={deleteIcon} alt="Delete" />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
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
