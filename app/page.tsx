"use client"


import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Brand from '@/components/layout/Brand';



export default function Home() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const user = Cookies.get('user');

      if (!user) {
          router.push('/auth/userselection');
      }
      else {
        const type = JSON.parse(user).type;
        router.push(`/userpage/${type}/calendar`);
      }
    }, 2500)
  }, [router]);

  return (
    <div className='animate-fadeOut mx-auto w-64 h-56 lg:w-96 lg:h-96 justify-center flex flex-col items-center mt-32 transform lg:scale-150'>
      <Brand />
      <h1 className='font-bold text-xl mt-5'>Votre santé, notre priorité!</h1>
    </div>
  );
}
