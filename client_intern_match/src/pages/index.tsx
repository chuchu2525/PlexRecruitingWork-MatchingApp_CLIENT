//ここは募集一覧ページ
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CompanyProfile {
  id: number;
  user: {
    name: string;
  };
  company_overview: string;
  business_description: string;
  job_description: string;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticProps() {
  const res = await fetch("http://localhost:3002/api//v1/users");
  const users = await res.json();
  console.log(users);
  return {
    props: {
      users,
    },
    revalidate: 60 * 60 * 24,
  };
}

export default function Home() {
  const [companyProfiles, setCompanyProfiles] = useState<CompanyProfile[]>([]);

  useEffect(() => {
    const fetchCompanyProfiles = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // トークンがない場合はログインページにリダイレクト
        window.location.href = '/login';
        return;
      }

      try {
        const res = await fetch("http://localhost:3002/api/v1/company_profiles", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const companyProfiles = await res.json();
          setCompanyProfiles(companyProfiles);
        } else {
          console.error('Failed to fetch company profiles');
        }
      } catch (error) {
        console.error('Error fetching company profiles:', error);
      }
    };

    fetchCompanyProfiles();
  }, []);
  return (
    <>
      <Head>
        <title>Company Description</title>
        <meta name="description" content="Company Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {companyProfiles.map((company: CompanyProfile) => (
          <div key={company.id} className={styles.userCard}>
            <Link href={`/company/${company.id}`} className={styles.userCardBox}>
                <h2>{company.user.name}</h2> 
            </Link>
            <p>{company.job_description}</p>
            <p>{company.business_description}</p>
            <button>応募</button>
          </div>
        ))}
      </div>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
