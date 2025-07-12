export type OrderData = {
  name: string;
  email: string;
};

export async function sendOrderMail(data: OrderData) {
  // 今はまだメールは送らない、ターミナルに出力するだけ
  console.log('📧 メール送信（仮処理）');
  console.log(`To: ${data.email}`);
  console.log(`Name: ${data.name}`);
  console.log('--- メール送信準備完了 ---');

  // 実際の送信処理は、ここに SendGrid や nodemailer を組み込みます
}
