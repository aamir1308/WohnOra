import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AlertsPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    // Fetch alerts or initialize state here
    console.log('AlertsPage loaded');
  }, [router.isReady]);

  return (
    <div className="flex flex-col h-screen bg-[#2563EB] text-white">
      {/* Header */}
      <header className="p-4 text-center text-lg font-semibold">WohnOra-Germany Alerts</header>

      {/* Main content */}
      <main className="flex-grow p-8">
        {router.isReady ? (
          // Render alerts or loading indicator here
          <div>Rendering alerts...</div>
        ) : (
          <p>Loading...</p>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs">© 2023 WohnOra-Germany</footer>
    </div>
  );
};

export default AlertsPage;