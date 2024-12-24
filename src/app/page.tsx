"use client";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <main>
      <h1>This is the Home Page Visit Products Page</h1>
      <button onClick={() => router.push('/products')}>Get Started &#x01F806; </button>
    </main>
  );
}
