import { useParams } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [postList] = usePosts();
  const post = postList?.filter(post => post.id === blogId)
  return (
    <section className="p-5 md:p-10">
      {
        post?.map(p => <div key={p.id} className="card card-compact bg-base-100 shadow-xl">
          <figure><img src={p?.photoUrl} alt="BlogPhoto" /></figure>
          <div className='flex items-center gap-2 p-2'>
            <img className='rounded-full' width={30} height={30} src={p?.author?.authorImg} alt="" />
            <p className='flex flex-col text-sm flex-grow'>
              <span>Post Date : {p?.postDate?.slice(0, 24)}</span>
              <span>Author : {p?.author?.name}</span>
            </p>
          </div>
          <div className="card-body">
            <h2 className="card-title">{p?.title}</h2>
            <p>{p?.postText}</p>
            <div className="card-actions">
              <button className="btn btn-link text-slate-700">Comments</button>
            </div>
          </div>
        </div>)
      }
    </section>
  );
};

export default BlogDetails;