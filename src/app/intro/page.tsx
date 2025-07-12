// src/app/intro/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000); // 4秒後にホーム遷移
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* 光に照らされる背景 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* 「ぐうぜん」の文字 */}
      <motion.h1
        className="text-5xl font-bold text-white shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        initial={{ letterSpacing: '0.5em', opacity: 0 }}
        animate={{ letterSpacing: '0em', opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        ぐうぜん
      </motion.h1>

      {/* 横切る人影（仮） */}
      <motion.div
        className="absolute bottom-10 w-32 h-32 bg-black/60 rounded-full blur-sm"
        initial={{ x: '-20%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 4, ease: 'linear' }}
      />

      {/* BGM 再生（自動再生未対応ブラウザでは1回タップ必要） */}
      <audio autoPlay src="/sounds/intro-bgm.mp3" className="hidden" />
    </div>
  );
}
