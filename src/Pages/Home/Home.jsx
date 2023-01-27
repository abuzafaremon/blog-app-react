import SinglePost from '../../Components/SinglePost/SinglePost';
import usePosts from '../../hooks/usePosts';

export default function Home() {
  const [postList] = usePosts();

  const filteredPost = postList.slice(0, postList.length);

  return (
    <div className='p-10'>
      <p className='text-3xl text-slate-700 font-bold text-center pb-5 uppercase'>Blogs</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          filteredPost.reverse().map((post) => <SinglePost post={post} key={post.id} />)
        }
      </div>
    </div>
  )
}
