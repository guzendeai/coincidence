// src/app/page.tsx
import Image from 'next/image';
import { postcards } from '@/data/postcards';

const GRID_WIDTH = 3000;
const GRID_HEIGHT = 2000;
const DISPLAY_COUNT = 45;
const COMING_SOON_COUNT = 4;

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function HomePage() {
  const shuffled = [...postcards].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, DISPLAY_COUNT);
  const postcardsLength = postcards.length;
  const randomPostcardId = postcards[getRandomInt(1,postcardsLength)-1].id;

  console.log(selected.length);

  const comingSoon = Array.from({ length: COMING_SOON_COUNT }).map((_, i) => ({
    id: `coming-soon-${i}`,
    title: 'Coming Soon',
    description: '',
    image: '/images/coming-soon.jpg',
    isAvailable: false,
  }));

  const displayCards = [...selected, ...comingSoon].map((card) => ({
    ...card,
    top: getRandomInt(0, GRID_HEIGHT - 200),
    left: getRandomInt(0, GRID_WIDTH - 200),
    rotation: getRandomInt(-10, 10),
  }));

  return (
    <div className="relative overflow-scroll w-screen h-screen">
      <div className="relative" style={{ width: GRID_WIDTH, height: GRID_HEIGHT }}>
        {displayCards.map((card) => (
          <a
            key={card.id}
            href={`/postcard/${randomPostcardId}`}
            className="absolute cursor-pointer"
            style={{
              top: card.top,
              left: card.left,
              transform: `rotate(${card.rotation}deg)`,
            }}
          >
            <Image
              src={card.image}
              alt={card.title}
              width={360}
              height={240}
              className="shadow-lg rounded-md"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
