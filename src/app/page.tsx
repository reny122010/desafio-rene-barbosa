import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const SearchComponent = dynamic(() => import('../components/SearchComponent.client'), {
  suspense: true,
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Suspense fallback={<div>Carregando...</div>}>
        <SearchComponent />
      </Suspense>
    </main>
  );
}
