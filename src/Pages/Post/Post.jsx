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
  const [uploadImage, setUploadImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const postCollectionRef = collection(db, 'posts');
  const imageListRef = ref(storage, 'images/');

  const imageUpload = () => {
    const imageRef = ref(storage, `images/${uploadImage?.name + v4()}`);
    uploadBytes(imageRef, uploadImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
      alert('Image Uploaded')
    })
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  }, [])

  const createPost = async () => {
    const postDate = new Date();
    if (uploadImage === null) return;
    await addDoc(postCollectionRef, { title, photoUrl: imageList[imageList.length - 1], postText, author: { name: user.displayName, id: user.uid, authorImg: user.photoURL }, postDate: postDate.toString() });
    alert('Post Added Successfully');
    navigate('/');
  }

  return (
    <div className="hero min-h-screen bg-base-200">
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
                <input onChange={(e) => setUploadImage(e.target.files[0])} type="file" name="" id="" className='file-input file-input-bordered' required />
                {uploadImage && <button onClick={imageUpload} className='btn btn-xs'>Upload Image</button>}
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
