'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingIntro() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // 余韻を残して遷移
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }, 4000); // ロード4秒後に完了

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* 背景に「ぐうぜん」の影文字 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-6xl font-bold text-white opacity-30">ぐうぜん</h1>
            </div>

            {/* ランダムな影（人通り） */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-64 bg-black"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.6,
                }}
                animate={{
                  x: ['0%', '200%'],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 1.5,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
