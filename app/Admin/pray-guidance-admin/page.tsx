'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/sidebar"; // ✅ Sidebar import fix
import { FiEdit, FiTrash } from "react-icons/fi";

interface Post {
  _id: string;
  category: string;
  description: string;
  path: string;
}

const PrayerGuidance = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/guidance');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !description) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      let newPost;
      if (editId) {
        await axios.put(`http://localhost:4000/api/users/guidance/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        newPost = { _id: editId, category, description, path: `/uploads/${image?.name}` };
      } else {
        const response = await axios.post('http://localhost:4000/api/users/guidance', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        newPost = response.data;
      }

      setPosts((prevPosts) => [newPost, ...prevPosts]);

      localStorage.setItem("savedPosts", JSON.stringify([newPost, ...JSON.parse(localStorage.getItem("savedPosts") || "[]")]));

      setCategory('');
      setDescription('');
      setImage(null);
      setEditId(null);
      router.push("/pray_guidance");
    } catch (error) {
      console.error('Error saving post:', error);
    }

    setLoading(false);
  };

  const handleEdit = (post: Post) => {
    setEditId(post._id);
    setCategory(post.category);
    setDescription(post.description);
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/users/guidance/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-darkGreen'>
      <Sidebar setActiveTab={setActiveTab}/>
      <div className="bg-darkGreen w-6 h-9 p-6 mt-6 rounded-lg shadow">
  <h2 className="text-darkGreen font-semibold mb-2">Current Tab: {activeTab}</h2>
  {activeTab === "users" && <p className="text-darkGreen ">Showing Users Section...</p>}
  {activeTab === "prayer_guidance" && <p className="text-darkGreen ">Showing Prayer Guidance Section...</p>}
</div>
      <div className='flex-1 p-6 overflow-y-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center text-white'>Prayer Guidance Management</h1>

        <form onSubmit={handleSubmit} className='space-y-4 bg-white p-4 rounded shadow lg:w-[900px] lg:m-auto' encType='multipart/form-data'>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" required>
            <option value="">Select a Prayer</option>
            <option value="Fajr">FAJAR</option>
            <option value="Zohr">DHUHR</option>
            <option value="Asr">ASR</option>
            <option value="Maghrib">MAGHRIB</option>
            <option value="Isha">Isha</option>
           

          </select>

          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full p-2 border rounded' required />

          <input type='file' accept='image/*' onChange={handleImageChange} className='w-full p-2 border rounded' />

          <button type='submit' className='bg-darkGreen hover:bg-HoverGreen text-white px-4 py-2 rounded w-full' disabled={loading}>
            {loading ? 'Saving...' : editId ? 'Update' : 'Save'}
          </button>
        </form>

        <div className="grid grid-cols-1 lg:w-[900px] sm:grid-cols-2 md:grid-cols-3 gap-4 mt-20 lg:m-auto">
          {posts.map((post, index) => (
            <div key={post._id || index} className='bg-white p-4 mt-10 rounded-lg shadow-lg'>
                <img src={`http://localhost:4000${post.path}`} alt={post.category} className='w-full h-60 object-cover mt-2 rounded' />

              <p className="font-semibold text-lg">{post.category}</p>
              <p className="text-sm text-gray-600">{post.description}</p>
            
              <div className="flex justify-between mt-3">
                <button onClick={() => handleEdit(post)} className='flex items-center bg-darkGreen hover:bg-HoverGreen text-white px-3 py-1 rounded'>
                  <FiEdit className="mr-2" /> Edit
                </button>
                <button onClick={() => handleDelete(post._id)} className='flex items-center bg-red-500 text-white px-3 py-1 rounded'>
                  <FiTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerGuidance;
