// src/app/layout.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
        <html lang="ja">
          <body className="relative">
           {/* ハンバーガーアイコン（サイドバーが開いてる時は非表示） */}
         {!menuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className="fixed top-4 left-4 z-50 p-2 bg-white shadow-md rounded"
              aria-label="メニューを開く"
            >
              ☰
            </button>
          )}

        {/* サイドメニュー */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-lg font-bold">メニュー</span>
            <button onClick={() => setMenuOpen(false)} aria-label="閉じる">
              ×
            </button>
          </div>
          <nav className="flex flex-col gap-4 p-4 text-sm font-semibold">
            <Link href="/" onClick={() => setMenuOpen(false)}>ホーム</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>わたしたち</Link>
          </nav>
        </aside>

       <main style={{ paddingTop: '16px', paddingLeft: '16px' }}>
         {children}
       </main>

       <footer
         style={{
           textAlign: 'center',
           fontSize: '14px',
           color: '#6B7280', 
           paddingTop: '24px',
           paddingBottom: '24px',
           borderTop: '1px solid #E5E7EB', 
         }}
       >
         © {new Date().getFullYear()} 旅
       </footer>

      </body>
    </html>
  );
}
