import axios from 'axios'
import {Post} from "../types";

const API_URL = "http://localhost:3001/posts";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(API_URL);
  return response.data;
}

export const fetchPost = async (id: string | undefined): Promise<Post> => {
  const response = await axios.get<Post>(`${API_URL}/${id}`);
  return response.data;
}

export const createPost = async (post: Omit<Post, 'id'|'createdAt'>): Promise<Post> => {
  const newPost = {...post, createdAt: new Date().toISOString()};
  const response = await axios.post(API_URL, newPost);
  return response.data;
}

export const updatePost  = async (id: string, post: Partial<Omit<Post, 'id'|'createdAt'>>): Promise<Post> => {
  const response = await axios.patch<Post>(`${API_URL}/${id}`, post);
  return response.data;
}

export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
}
