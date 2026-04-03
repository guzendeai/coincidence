'use client';

// src/app/page.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ContentItem } from '@/data/contents';
import ContentModal from '@/components/ContentModal';

// Cube3Dはクライアントサイドのみで動作するためdynamic importを使用
const Cube3D = dynamic(() => import('@/components/Cube3D'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: 'clamp(220px, 72vw, 380px)',
      height: 'clamp(220px, 52vh, 380px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.1em', fontFamily: 'Georgia, serif' }}>
        loading...
      </div>
    </div>
  ),
});

function useCubeSize() {
  const [size, setSize] = useState(340);
  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const base = Math.min(vw * 0.72, vh * 0.52, 380);
      setSize(Math.max(220, Math.floor(base)));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

export default function HomePage() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showHint, setShowHint] = useState(true);
  const [mounted, setMounted] = useState(false);
  const cubeSize = useCubeSize();

  useEffect(() => {
    setMounted(true);
    // ヒントを3秒後に消す
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#f4f1ec',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 背景の微細なテクスチャパターン */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(139, 115, 85, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(74, 111, 165, 0.04) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* サイトタイトル */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 10,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}
      >
        <h1
          style={{
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.25em',
            color: '#8a7a6a',
            fontFamily: 'Georgia, serif',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          Portfolio
        </h1>
        <div
          style={{
            width: '24px',
            height: '1px',
            background: '#c4b89a',
            margin: '8px auto 0',
          }}
        />
      </div>

      {/* メインの立方体エリア */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
        }}
      >
        {/* 影 */}
        <div
          style={{
            position: 'absolute',
            bottom: `-${Math.round(cubeSize * 0.12)}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${Math.round(cubeSize * 0.88)}px`,
            height: `${Math.round(cubeSize * 0.12)}px`,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Cube3D onFaceClick={setSelectedContent} size={cubeSize} />
      </div>

      {/* ドラッグヒント */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: showHint ? 0.6 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: 'none',
          zIndex: 10,
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ fontSize: '11px', color: '#8a7a6a', letterSpacing: '0.12em', fontFamily: 'Georgia, serif' }}>
          drag to rotate
        </div>
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#c4b89a', animation: 'bounceX 1.5s ease-in-out infinite' }}>←</span>
          <span style={{ fontSize: '18px', color: '#c4b89a', animation: 'bounceX 1.5s ease-in-out infinite reverse' }}>→</span>
        </div>
      </div>

      {/* ボトムナビ */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          zIndex: 10,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease 0.8s',
          whiteSpace: 'nowrap',
        }}
      >
        <Link
          href="/contents"
          style={{
            fontSize: '11px',
            color: '#8a7a6a',
            textDecoration: 'none',
            letterSpacing: '0.12em',
            fontFamily: 'Georgia, serif',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#4a3a2a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#8a7a6a')}
        >
          <span style={{ fontSize: '14px' }}>⊞</span>
          すべてを見る
        </Link>

        <div style={{ width: '1px', height: '16px', background: '#d4c8b8' }} />

        <Link
          href="/about"
          style={{
            fontSize: '11px',
            color: '#8a7a6a',
            textDecoration: 'none',
            letterSpacing: '0.12em',
            fontFamily: 'Georgia, serif',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#4a3a2a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#8a7a6a')}
        >
          about
        </Link>
      </div>

      {/* モーダル */}
      <ContentModal
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
      />
    </div>
  );
}
