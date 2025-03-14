import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface FormData {
  email: string;
  password: string;
  role: 'student' | 'company';
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: 'student', // デフォルト値を設定
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/api/v1/login', formData);
      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        if (user.role === 'student') {
          router.push(`/student-profile?userId=${user.id}&name=${user.name}`);
        } else if (user.role === 'company') {
          router.push(`/company-profile?userId=${user.id}&name=${user.name}`);
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      alert('ログインに失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="student">Student</option>
        <option value="company">Company</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;