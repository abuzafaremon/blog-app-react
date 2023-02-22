import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.config';
import google from '../../assets/images/google.png'

export default function Login() {
  const [signInWithGoogle, user, loading] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  if (user) {
    navigate('/post');
  }
  if (loading) {
    return <p className='text-3xl p-4'>Loading...</p>
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">If you want to create post in this blog website, You need to Log In with your gmail.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="Disabled" className="input input-bordered" readOnly disabled />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="text" placeholder="Disabled" className="input input-bordered" readOnly disabled />
              <label className="label">
                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn capitalize gap-2" onClick={() => signInWithGoogle()}>
                <img width={20} src={google} alt="google" />
                <span>Sign In With Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
