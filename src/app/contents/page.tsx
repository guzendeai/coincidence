'use client';

// src/app/contents/page.tsx
import { useState } from 'react';
import Link from 'next/link';
import { contents, ContentItem, ContentCategory, categoryLabels, categoryColors } from '@/data/contents';

const CATEGORIES: ContentCategory[] = ['note', 'app', 'link', 'photo', 'video', 'activity'];

export default function ContentsPage() {
  const [activeCategory, setActiveCategory] = useState<ContentCategory | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? contents
    : contents.filter(c => c.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f7', padding: '0' }}>
      {/* ヘッダー */}
      <div
        style={{
          borderBottom: '1px solid #e8e4df',
          padding: '40px 40px 32px',
          background: '#faf9f7',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <Link
                href="/"
                style={{
                  fontSize: '11px',
                  color: '#999',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  fontFamily: 'Georgia, serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                ← もどる
              </Link>
            </div>
            <h1
              style={{
                fontSize: '13px',
                fontWeight: 400,
                color: '#666',
                letterSpacing: '0.15em',
                fontFamily: 'Georgia, serif',
                margin: 0,
              }}
            >
              All Contents
            </h1>
          </div>

          {/* カテゴリフィルター */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <FilterButton
              label="すべて"
              isActive={activeCategory === 'all'}
              color="#333"
              onClick={() => setActiveCategory('all')}
            />
            {CATEGORIES.map(cat => (
              <FilterButton
                key={cat}
                label={categoryLabels[cat]}
                isActive={activeCategory === cat}
                color={categoryColors[cat]}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* コンテンツグリッド */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 40px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {filtered.map(item => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>

        <div
          style={{
            marginTop: '60px',
            textAlign: 'center',
            fontSize: '11px',
            color: '#aaa',
            letterSpacing: '0.1em',
            fontFamily: 'Georgia, serif',
          }}
        >
          {filtered.length} items
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  label,
  isActive,
  color,
  onClick,
}: {
  label: string;
  isActive: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        fontSize: '11px',
        letterSpacing: '0.06em',
        fontFamily: "'Noto Sans JP', sans-serif",
        border: `1px solid ${isActive ? color : '#ddd'}`,
        background: isActive ? color : 'transparent',
        color: isActive ? '#fff' : '#666',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  );
}

function ContentCard({ content }: { content: ContentItem }) {
  const categoryColor = categoryColors[content.category];
  const label = categoryLabels[content.category];

  return (
    <a
      href={content.url}
      target={content.isExternal ? '_blank' : '_self'}
      rel={content.isExternal ? 'noopener noreferrer' : undefined}
      style={{
        display: 'block',
        background: '#fff',
        borderRadius: '4px',
        overflow: 'hidden',
        textDecoration: 'none',
        border: '1px solid #ede9e4',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* サムネイルエリア */}
      <div
        style={{
          height: '140px',
          background: `linear-gradient(160deg, ${categoryColor}20 0%, ${categoryColor}40 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: '40px', opacity: 0.4 }}>
          {getCategoryIcon(content.category)}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}40)`,
          }}
        />
      </div>

      {/* テキストエリア */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', color: categoryColor, fontWeight: 500, letterSpacing: '0.08em', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            {label}
          </span>
          {content.isExternal && (
            <span style={{ fontSize: '9px', color: '#bbb', marginLeft: 'auto' }}>↗</span>
          )}
        </div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.4, fontFamily: "'Noto Serif JP', Georgia, serif" }}>
          {content.title}
        </h3>
        <p style={{ fontSize: '11px', color: '#888', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: "'Noto Sans JP', sans-serif" }}>
          {content.description}
        </p>
      </div>
    </a>
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
