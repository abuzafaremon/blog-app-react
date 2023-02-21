import SinglePost from '../../Components/SinglePost/SinglePost';
import usePosts from '../../hooks/usePosts';

export default function Blog() {
  const [postList] = usePosts();
  return (
    <div className='p-5 md:p-10'>
      <p className='text-3xl text-slate-700 font-bold text-center pb-5 uppercase'> All Blogs</p>
      <div className='w-full max-w-2xl mx-auto grid gap-5'>
        {
          postList.reverse().map((post) => <SinglePost post={post} key={post.id} />)
        }
      </div>
    </div>
  )
}
