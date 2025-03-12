import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface FormData {
  user_id: number;
  name: string;
  grade: string;
  university: string;
  faculty: string;
  self_introduction: string;
  experience: string;
}

const StudentProfile = () => {
  const router = useRouter();
  const { userId, name } = router.query;

  const [formData, setFormData] = useState<FormData>({
    user_id: Number(userId),
    name: typeof name === 'string' ? name : '',
    grade: '',
    university: '',
    faculty: '',
    self_introduction: '',
    experience: '',
  });

  useEffect(() => {
    if (typeof userId === 'string') {
      setFormData((prevData) => ({ ...prevData, user_id: Number(userId) }));
    }
    if (typeof name === 'string') {
      setFormData((prevData) => ({ ...prevData, name }));
    }
  }, [userId, name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/api/v1/student_profiles', { student_profile: formData });
      if (response.status === 201) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error creating student profile:', error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`プロフィール作成に失敗しました: ${error.response.data.error}`);
      } else {
        alert('プロフィール作成に失敗しました');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <select name="grade" value={formData.grade} onChange={handleChange} required>
        <option value="">Select Grade</option>
        <option value="学部1年">学部1年</option>
        <option value="学部2年">学部2年</option>
        <option value="学部3年">学部3年</option>
        <option value="学部4年">学部4年</option>
        <option value="修士1年">修士1年</option>
        <option value="修士2年">修士2年</option>
      </select>
      <input type="text" name="university" placeholder="University" value={formData.university} onChange={handleChange} required />
      <input type="text" name="faculty" placeholder="Faculty" value={formData.faculty} onChange={handleChange} required />
      <textarea name="self_introduction" placeholder="Self Introduction" value={formData.self_introduction} onChange={handleChange} required />
      <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentProfile;