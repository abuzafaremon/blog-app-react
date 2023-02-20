import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";

export default function usePosts() {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef)
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPosts();
  }, []);

  return [postList, setPostList]
}
