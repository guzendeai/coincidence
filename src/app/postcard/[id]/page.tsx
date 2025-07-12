// src/app/postcard/[id]/page.tsx
import { postcards } from '@/data/postcards';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export default function PostcardPage({ params }: Props) {
  const postcard = postcards.find((card) => card.id === params.id);
  if (!postcard) return notFound();

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6">
    {/* 左カラム：画像 */}
    <div className="flex justify-center items-center mt-10">
      <Image
        src={postcard.image}
        alt={postcard.title}
        width={500}
        height={350}
        className="rounded-lg shadow"
      />
    </div>

    {/* 右カラム：情報 */}
    <div className="flex flex-col justify-center space-y-6">
      <h1 className="text-2xl font-bold">{postcard.title}</h1>
      <p className="text-gray-700">{postcard.description}</p>

      {/* ✅ 購入枚数セレクトボックス */}
      <label className="text-sm font-medium">
        購入枚数：
        <select
          name="quantity"
          className="mt-1 block w-32 p-2 border border-gray-300 rounded"
          defaultValue="1"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} 枚
            </option>
          ))}
        </select>
      </label>

      {postcard.isAvailable ? (
        <Link
          href={{
            pathname: '/checkout',
            query: {
              id: postcard.id,
              title: postcard.title,
              price: postcard.price,
              code: postcard.code,
            },
          }}
          className="inline-block text-center mt-2 px-4 py-2 bg-black text-white rounded shadow hover:bg-blue-600 transition"
        >
          カートに入れる
        </Link>
      ) : (
        <p className="text-gray-500">現在このポストカードは販売していません。</p>
      )}
    </div>
  </div>
  );
}
