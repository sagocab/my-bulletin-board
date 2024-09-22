// src/components/PostList.tsx
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchPosts, deletePost } from '../api/posts';
import { Post } from '../types';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {


  const { data, isLoading, isError, error } = useQuery<Post[], Error>({ queryKey: ['posts'], queryFn: fetchPosts });

  const mutation = useMutation({mutationFn: (id: string) => deletePost(id)});

  const handleDelete = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      mutation.mutate(id);
    }
  }

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>
  }

  if (isError) {
    return <div className="text-center text-red-500">에러: {error.message}</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">게시판</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          글 작성
        </Link>
      </div>
      <ul className="space-y-4">
        {(data || []).map(post => ( // data가 배열인지 확인
          <li key={post.id} className="p-4 border rounded shadow">
            <Link to={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-600 text-sm">작성일: {new Date(post.createdAt).toLocaleString()}</p>
            <div className="mt-2 flex space-x-2">
              <Link
                to={`/edit/${post.id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                수정
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
