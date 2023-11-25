"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react'

function NavClient() {
    const searchParams = useSearchParams();
    console.log(searchParams.get('lat'));
  return (
    <div>NavClient</div>
  )
}

export default NavClient