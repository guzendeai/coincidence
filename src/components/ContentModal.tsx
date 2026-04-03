'use client';

// src/components/ContentModal.tsx
import { useEffect } from 'react';
import { ContentItem, categoryLabels, categoryColors } from '@/data/contents';

type ContentModalProps = {
  content: ContentItem | null;
  onClose: () => void;
};

export default function ContentModal({ content, onClose }: ContentModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (content) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [content, onClose]);

  if (!content) return null;

  const categoryColor = categoryColors[content.category];
  const label = categoryLabels[content.category];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      {/* オーバーレイ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* モーダル本体 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          background: '#faf9f7',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* 上部アクセントバー */}
        <div
          style={{
            height: '4px',
            background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}40)`,
          }}
        />

        {/* 画像エリア */}
        <div
          style={{
            height: '220px',
            background: `linear-gradient(160deg, ${categoryColor}25 0%, ${categoryColor}50 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: '72px', opacity: 0.35 }}>
            {getCategoryIcon(content.category)}
          </div>
          
          {/* 閉じるボタン */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#333',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            ✕
          </button>
        </div>

        {/* コンテンツ情報 */}
        <div style={{ padding: '28px 28px 32px' }}>
          {/* カテゴリ */}
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: categoryColor,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontFamily: 'Georgia, serif',
              }}
            >
              {label}
            </span>
            <span style={{ width: '24px', height: '1px', background: categoryColor, opacity: 0.4, display: 'block' }} />
          </div>

          {/* タイトル */}
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#1a1a1a',
              lineHeight: 1.4,
              margin: '0 0 16px',
              fontFamily: "'Noto Serif JP', Georgia, serif",
              letterSpacing: '0.03em',
            }}
          >
            {content.title}
          </h2>

          {/* 説明文 */}
          <p
            style={{
              fontSize: '14px',
              color: '#555',
              lineHeight: 1.8,
              margin: '0 0 24px',
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          >
            {content.description}
          </p>

          {/* タグ */}
          {content.tags && content.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
              {content.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    color: '#888',
                    background: '#f0eeeb',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTAボタン */}
          <a
            href={content.url}
            target={content.isExternal ? '_blank' : '_self'}
            rel={content.isExternal ? 'noopener noreferrer' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '14px',
              background: '#1a1a1a',
              color: '#faf9f7',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '0.08em',
              fontFamily: 'Georgia, serif',
              borderRadius: '2px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#333')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
          >
            {content.isExternal ? '外部サイトへ' : '詳しく見る'}
            <span style={{ fontSize: '16px' }}>{content.isExternal ? '↗' : '→'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    note: '✍',
    app: '◻',
    link: '⬡',
    photo: '◈',
    video: '▷',
    activity: '◎',
  };
  return icons[category] ?? '○';
}
