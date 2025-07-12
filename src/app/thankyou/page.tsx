// src/app/thankyou/page.tsx

export default function ThankYouPage() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold text-green-600">ご購入ありがとうございました！</h1>
      <p>ご入力いただいたメールアドレス宛に確認メールをお送りしました。</p>
      <p className="text-sm text-gray-500">トップページに戻る場合はブラウザの戻るボタンをご利用ください。</p>
    </div>
  );
}
