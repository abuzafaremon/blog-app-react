import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { auth } from "../../firebase.config";
import usePosts from "../../hooks/usePosts";
import demoUser from '../../assets/images/demoUser.png';

const BlogDetails = () => {
  const [user] = useAuthState(auth);
  const { blogId } = useParams();
  const [postList] = usePosts();
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [isCommented, setIsCommented] = useState(false);
  const post = postList?.filter(post => post.id === blogId)
  const navigate = useNavigate();

  //like function
  const handleLike = () => {
    if (user) {
      setIsLiked(!isLiked);
      if (isLiked) {
        setLike((prev) => prev - 1)
      } else {
        setLike((prev) => prev + 1)
      }
    } else {
      swal({
        title: "You are not Logged In!",
        text: "You cannot Like. Would you want to log in?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((yes) => {
          if (yes) {
            navigate('/login')
          }
        });
    }
  }
  //comment function
  const handleComment = (e) => {
    e.preventDefault();
    // const comment = e.target.comment.value;
    // swal(`Your Comment "${comment}" is coming soon`)
    if (user) {
      setComment(e.target.comment.value)
      setIsCommented(true)
      e.target.comment.value = '';
    } else {
      swal({
        title: "You are not Logged In!",
        text: "You cannot Comment. Would you want to log in?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((yes) => {
          if (yes) {
            navigate('/login')
          }
        });
    }
  }
  //share function
  const handleShare = () => {
    const shareLink = window.location.href;
    navigator.clipboard.writeText(shareLink)
    swal("Share Link Copied", "", "success")
  }

  return (
    <section className="p-5 md:p-10">
      {
        post?.map(p => <div key={p.id} className="card card-compact bg-base-100 shadow-xl">
          {/* post image */}
          <figure><img src={p?.photoUrl} alt="BlogPhoto" /></figure>
          {/* post author details */}
          <div className='flex items-center gap-2 p-4'>
            <img className='rounded-full' width={30} height={30} src={p?.author?.authorImg} alt="" />
            <p className='flex flex-col text-sm flex-grow'>
              <span>Author : {p?.author?.name}</span>
              <span>Post Date : {p?.postDate?.slice(0, 24)}</span>
            </p>
          </div>
          {/* post details */}
          <div className="card-body">
            <h2 className="card-title">{p?.title}</h2>
            <p>{p?.postText}</p>
            {/* like comment and share button */}
            <div className="card-actions items-center border-t-2 border-b-2 py-2">
              <button className="btn btn-sm gap-2" onClick={handleLike}>
                <span>{like}</span>
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
              <label htmlFor="comment" className="btn btn-sm gap-2"><span>0</span><span>Comments</span></label>
              <button className="btn btn-sm" onClick={handleShare}>Share</button>
            </div>
            {/* comment option */}
            <div className="flex items-start gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-slate-700 ring-offset-base-100 ring-offset-2">
                  {
                    user?.photoURL ?
                      <img src={user?.photoURL} alt='userPhoto' /> :
                      <img src={demoUser} alt='userPhoto' />
                  }
                </div>
              </div>
              <form className="flex gap-2 items-center w-full" onSubmit={handleComment}>
                <textarea name="comment" id="comment" placeholder="Write your comment..." required className="textarea w-full sm:w-2/5 textarea-bordered resize-none h-0"></textarea>
                <button className="btn">Comment</button>
              </form>
            </div>
            {/* display comments */}
            <div className="pt-2">
              {isCommented && <div className="flex items-start gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-slate-700 ring-offset-base-100 ring-offset-2">
                    {
                      user?.photoURL ?
                        <img src={user?.photoURL} alt='userPhoto' /> :
                        <img src={demoUser} alt='userPhoto' />
                    }
                  </div>
                </div>
                <div className="w-fit bg-slate-200 rounded-md grid px-2 py-1">
                  <span className="font-bold">{user?.displayName}</span>
                  <span>{comment}</span>
                </div>
              </div>}
            </div>
            {/* display comments end */}
          </div>
        </div>)
      }
    </section>
  );
};

export default BlogDetails;