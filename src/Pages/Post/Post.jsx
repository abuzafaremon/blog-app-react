import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export default function Post() {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const postCollectionRef = collection(db, 'posts');
  const imageListRef = ref(storage, 'images/');

  const imageUpload = () => {
    const imageRef = ref(storage, `images/${uploadedImage?.name + v4()}`);
    uploadBytes(imageRef, uploadedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [url, ...prev])
      })
      alert('Image Uploaded')
    })
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [url, ...prev]);
        })
      })
    })
  }, [])

  const createPost = async () => {
    const postDate = new Date();
    if (uploadedImage === null) return;
    await addDoc(postCollectionRef, { title, photoUrl: imageList[0], postText, author: { name: user.displayName, id: user.uid, authorImg: user.photoURL }, postDate: postDate.toString() });
    alert('Post Added Successfully');
    navigate('/blog');
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
                <input onChange={(e) => setUploadedImage(e.target.files[0])} type="file" name="" id="" className='file-input file-input-bordered' required />
                {uploadedImage && <button onClick={imageUpload} className='btn btn-xs'>Upload Image</button>}
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
