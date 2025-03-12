import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface FormData {
  user_id: number;
  company_overview: string;
  business_description: string;
  job_description: string;
}

const CompanyProfile = () => {
  const router = useRouter();
  const { userId, name } = router.query;

  const [formData, setFormData] = useState<FormData>({
    user_id: Number(userId),
    company_overview: '',
    business_description: '',
    job_description: '',
  });

  useEffect(() => {
    if (typeof name === 'string') {
      setFormData((prevData) => ({ ...prevData, company_overview: name }));
    }
  }, [name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/api/v1/company_profiles', { company_profile: formData });
      if (response.status === 201) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error creating company profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea name="company_overview" placeholder="Company Overview" value={formData.company_overview} onChange={handleChange} required />
      <textarea name="business_description" placeholder="Business Description" value={formData.business_description} onChange={handleChange} required />
      <textarea name="job_description" placeholder="Job Description" value={formData.job_description} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CompanyProfile;