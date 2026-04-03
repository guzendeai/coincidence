'use client';

// src/components/CubeFace.tsx
import { ContentItem, categoryLabels, categoryColors } from '@/data/contents';

type CubeFaceProps = {
  content: ContentItem;
  faceId: string;
  isVisible: boolean;
  onClick: (content: ContentItem) => void;
};

export default function CubeFace({ content, isVisible, onClick }: CubeFaceProps) {
  const categoryColor = categoryColors[content.category];
  const label = categoryLabels[content.category];

  return (
    <div
      className="cube-face"
      onClick={() => isVisible && onClick(content)}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: isVisible ? 'pointer' : 'default',
        overflow: 'hidden',
        borderRadius: '3px',
        background: '#f8f5f0',
        backfaceVisibility: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 上部アクセントライン */}
      <div
        style={{
          height: '3px',
          background: `linear-gradient(90deg, ${categoryColor}90, ${categoryColor}20)`,
          flexShrink: 0,
        }}
      />

      {/* 画像エリア（上半分） */}
      <div
        style={{
          flex: '0 0 54%',
          position: 'relative',
          background: `linear-gradient(145deg, ${content.accentColor}22 0%, ${content.accentColor}55 100%)`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 背景グリッドテクスチャ風 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(${content.accentColor}08 1px, transparent 1px),
              linear-gradient(90deg, ${content.accentColor}08 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* カテゴリアイコン */}
        <div
          style={{
            fontSize: 'clamp(36px, 10vw, 52px)',
            opacity: 0.3,
            userSelect: 'none',
            position: 'relative',
            zIndex: 1,
            lineHeight: 1,
          }}
        >
          {getCategoryIcon(content.category)}
        </div>

        {/* カテゴリラベル（右下） */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: categoryColor,
            fontWeight: 600,
            textTransform: 'uppercase',
            fontFamily: 'Georgia, serif',
            opacity: 0.8,
          }}
        >
          {label}
        </div>
      </div>

      {/* テキストエリア（下半分） */}
      <div
        style={{
          flex: 1,
          padding: '14px 16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          background: '#f8f5f0',
          position: 'relative',
        }}
      >
        {/* タイトル */}
        <h3
          style={{
            fontSize: 'clamp(12px, 3vw, 15px)',
            fontWeight: 600,
            color: '#1a1a1a',
            lineHeight: 1.4,
            margin: 0,
            fontFamily: "'Noto Serif JP', Georgia, serif",
            letterSpacing: '0.02em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {content.title}
        </h3>

        {/* 説明文 */}
        <p
          style={{
            fontSize: 'clamp(9px, 2.5vw, 11px)',
            color: '#777',
            lineHeight: 1.6,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: "'Noto Sans JP', sans-serif",
          }}
        >
          {content.description}
        </p>

        {/* タップヒント */}
        {isVisible && (
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '4px',
              fontSize: '9px',
              color: '#bbb',
              letterSpacing: '0.08em',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
            }}
          >
            tap to open →
          </div>
        )}
      </div>

      {/* ホバー時の薄いオーバーレイ（正面面のみ） */}
      {isVisible && (
        <div
          className="face-hover-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: `${content.accentColor}00`,
            transition: 'background 0.3s ease',
            pointerEvents: 'none',
            borderRadius: '3px',
          }}
        />
      )}
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
