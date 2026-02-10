'use client';

import { Suspense } from 'react';
import { ContactPageContent } from '@/features/contact/client/components';

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
            <ContactPageContent />
        </Suspense>
    );
}
