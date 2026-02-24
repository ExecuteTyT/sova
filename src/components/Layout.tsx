import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-sans">
      {/* Header will be added here */}
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer will be added here */}
    </div>
  );
}
