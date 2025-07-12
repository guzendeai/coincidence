'use client';

import { useSearchParams } from 'next/navigation';
import PurchaseForm from '@/components/PurchaseForm';

export default function CheckoutPage() {
  const params = useSearchParams();
  const title = params.get('title');
  const price = params.get('price');
  const code = params.get('code');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ポストカード購入</h1>

      {title && (
        <div className="border rounded p-4 bg-gray-50">
          <p>📮 商品名：{title}</p>
          <p>💰 価格：{price}円</p>
          <p>🔢 品番：{code}</p>
        </div>
      )}

      <PurchaseForm postcard={{ title, price, code }} />
    </div>
  );
}
