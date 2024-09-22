import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost} from "../api/posts.ts";
import {Link, useNavigate} from "react-router-dom";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      // Handle successful post creation
      console.log('Post created successfully:', data);
      navigate('/');
      // You can add additional logic here, such as updating the UI or showing a success message
    },
    onError: (error) => {
      // Handle error in post creation
      console.error('Error creating post:', error);
      // You can add error handling logic here, such as showing an error message to the user
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ title, content })
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-500 underline">← 게시판으로 돌아가기</Link>
      <h1 className="text-2xl font-bold mb-4">새 게시글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">내용</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
            rows={5}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          작성 완료
        </button>
      </form>
    </div>
  )
}

export default CreatePost
