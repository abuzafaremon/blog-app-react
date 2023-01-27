import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello There</h1>
          <h1 className="text-xl font-bold pt-3">Welcome to BlogX</h1>
          <p className="py-6">In this website, you can log in with your Gmail. You can create blog post. Some Features are coming soon...</p>
          <Link to='/login' className="btn">Get Started</Link>
        </div>
      </div>
    </div>
  )
}
