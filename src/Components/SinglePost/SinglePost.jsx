import { useNavigate } from "react-router-dom";
import TimeAgo from "timeago-react";

export default function SinglePost({ post }) {

  const { title, photoUrl, postText, author, currentDate, currentTime, id } = post;
  const navigate = useNavigate();
  const detailsPage = (id) => {
    navigate(`/blog/${id}`);
  }

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure className="max-h-64 overflow-hidden"><img className="w-full" src={photoUrl} alt="BlogPhoto" /></figure>
      <div className='flex items-center gap-2 p-2'>
        <img className='rounded-full' width={30} height={30} src={author.authorImg} alt="" />
        <p className='flex flex-col text-sm flex-grow'>
          <span><strong>{author.name}</strong></span>
          <TimeAgo
            datetime={`${post.currentDate} ${""} ${post.currentTime
              }`}
          />
        </p>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{postText.slice(0, 100)}</p>
        <div className="card-actions justify-end">
          <button className="btn" onClick={() => detailsPage(id)}>Read More &raquo;</button>
        </div>
      </div>
    </div>
  )
}
