export default function SinglePost({ post }) {

  const { title, photoUrl, postText, author, postDate } = post;
  const detailsPage = () => {
    alert('Details Page Coming Soon')
  }

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure><img src={photoUrl} alt="" /></figure>
      <div className='flex items-center gap-2 p-2'>
        <img className='rounded-full' width={30} height={30} src={author.authorImg} alt="" />
        <p className='flex flex-col text-sm flex-grow'>
          <span>Post Date : {postDate?.slice(0, 24)}</span>
          <span>Posted By : {author.name}</span>
        </p>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{postText}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-link text-slate-700">Comments</button>
          <button className="btn" onClick={detailsPage}>Read More &raquo;</button>
        </div>
      </div>
    </div>
  )
}
