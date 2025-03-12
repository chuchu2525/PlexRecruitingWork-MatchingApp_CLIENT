import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'company';
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'student',
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
      const response = await axios.post('http://localhost:3002/api/v1/users', { user: formData });
      if (response.status === 201) {
        const user = response.data;
        if (user.role === 'student') {
          router.push(`/student-profile?userId=${user.id}&name=${user.name}`);
        } else if (user.role === 'company') {
          router.push(`/company-profile?userId=${user.id}&name=${user.name}`);
        }
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="company">Company</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;