// src/components/EditPost.tsx
import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPost, updatePost } from '../api/posts'
import { Post } from '../types'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const postId = id || '';
  const { data: post, isLoading, isError, error } = useQuery<Post, Error>({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId)
  })
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

const mutation = useMutation<Post, Error, Partial<Omit<Post, 'id' | 'createdAt'>>>({
  mutationFn: (post) => updatePost(postId, post),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    navigate('/');
  },
});


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ title, content })
  }

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>
  }

  if (isError) {
    return <div className="text-center text-red-500">에러: {error.message}</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
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
          수정 완료
        </button>
      </form>
    </div>
  )
}

export default EditPost
