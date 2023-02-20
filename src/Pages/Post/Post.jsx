import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export default function Post() {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const postCollectionRef = collection(db, 'posts');

  const createPost = async () => {
    const postDate = new Date();

    const imageRef = ref(storage, `images/${uploadedImage?.name + v4()}`);
    await uploadBytes(imageRef, uploadedImage).then((snapshot) => {
      // get image url 
      getDownloadURL(snapshot.ref).then((url) => {
        // add post to database
        addDoc(postCollectionRef, { title, photoUrl: url, postText, author: { name: user.displayName, id: user.uid, authorImg: user.photoURL }, postDate: postDate.toString() });
        alert('Post Added Successfully');
        navigate('/blogs');
      })
    })
  }

  return (
    <div className="hero min-h-screen bg-base-300">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title:</span>
              </label>
              <input type="text" placeholder="Title..." className="input input-bordered" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Post:</span>
              </label>
              <textarea type="text" placeholder="Description..." className="textarea input-bordered resize-none" onChange={(e) => setPostText(e.target.value)} ></textarea>
              <label className="label flex-col">
                {uploadedImage && (
                  <img src={URL.createObjectURL(uploadedImage)} alt="postImage" />
                )}
                <input onChange={(e) => setUploadedImage(e.target.files[0])} type="file" name="" id="" className='file-input file-input-bordered file-input-xs sm:file-input-sm md:file-input-md ' required />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn" onClick={createPost}>Submit Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
