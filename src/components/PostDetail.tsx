// src/components/PostDetail.tsx
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPost } from '../api/posts'
import { useParams, Link } from 'react-router-dom'

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError, error } = useQuery({ queryKey: ['posts', id], queryFn: () => fetchPost(id) });

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>
  }

  if (isError) {
    return <div className="text-center text-red-500">에러: {error.message}</div>
  }

  if (!post) {
    return <div className="text-center">게시글을 찾을 수 없습니다.</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-500 underline">← 게시판으로 돌아가기</Link>
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <p className="text-gray-600 text-sm">작성일: {new Date(post.createdAt).toLocaleString()}</p>
      <div className="mt-4">
        <p>{post.content}</p>
      </div>
      <div className="mt-4 flex space-x-2">
        <Link
          to={`/edit/${post.id}`}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          수정
        </Link>
      </div>
    </div>
  )
}

export default PostDetail
