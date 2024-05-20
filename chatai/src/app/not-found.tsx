// pages/404.tsx
import { NextPage } from 'next';
import { Table } from '@/components/ui/table'; // Assuming Table is a component offered by Shadcn
import { Button } from '@/components/ui/button'; // Assuming Table is a component offered by Shadcn
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-wrap md:flex-nowrap container mx-auto p-4">

                {/* Left Column for SVG or Icon */}
                <div className="flex justify-center items-center w-full md:w-1/3 mb-4 md:mb-0">
                    {/* Placeholder for SVG/Icon */}
                    <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l-2.293 2.293a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L6 3.586l4.293-4.293a1 1 0 011.414 1.414l-4 4a1 1 0 010 1.414L9 11h11a1 1 0 011 1v7a1 1 0 11-2 0v-5H9z" />
                    </svg>
                </div>

                {/* Right Column for Text and Tables */}
                <div className="flex flex-col justify-start items-start w-full md:w-2/3">
                    <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
                    <p className="mb-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                    <Link href={"/"}>
                        <Button className="font-bold py-2 px-4 rounded mb-4">
                            Go Home
                        </Button>
                    </Link>


                </div>
            </div>
        </div >
    );
};

