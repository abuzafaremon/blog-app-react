import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import swal from 'sweetalert';

export default function Post() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [postText, setPostText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const postCollectionRef = collection(db, 'posts');

  const createPost = async () => {
    setLoading(true)
    const postDate = new Date();
    const imageRef = ref(storage, `images/${uploadedImage?.name + v4()}`);
    await uploadBytes(imageRef, uploadedImage).then((snapshot) => {
      // get image url 
      getDownloadURL(snapshot.ref).then((url) => {
        // add post to database
        addDoc(postCollectionRef, {
          title,
          photoUrl: url,
          postText,
          author: { name: user.displayName, id: user.uid, authorImg: user.photoURL },
          postDate: postDate.toString()
        });
        setLoading(false)
        swal("Good job!", "Post Added Successfully", "success");
        navigate('/blogs');
      })
    })
  }

  return (
    <div className="hero min-h-screen bg-base-300">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className='text-sm'>Hey {user.displayName}, write your post...</h2>
            <div className="form-control">
              <label htmlFor='title' className="label">
                <span className="label-text">Title:</span>
              </label>
              <input type="text" id='title' placeholder="Title..." className="input input-bordered" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
              <label htmlFor='postText' className="label">
                <span className="label-text">Post:</span>
              </label>
              <textarea type="text" id='postText' placeholder={`Whats on your mind ${user.displayName}`} className="textarea input-bordered resize-none" onChange={(e) => setPostText(e.target.value)} ></textarea>
              <label className="label flex-col">
                {uploadedImage && (
                  <img src={URL.createObjectURL(uploadedImage)} alt="postImage" />
                )}
                <input type="file" required className='file-input file-input-bordered file-input-xs sm:file-input-sm md:file-input-md' onChange={(e) => setUploadedImage(e.target.files[0])} />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn" onClick={createPost}>
                {loading ? <progress className="progress progress-success"></progress> : 'Submit Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
