// src/actions/submitOrder.ts
'use server';

import { purchaseSchema } from '@/lib/validation';
import { parse } from '@conform-to/zod';
import { redirect } from 'next/navigation'; // ✅ 追加

export async function submitOrder(prev: unknown, formData: FormData) {
  const submission = parse(formData, {
    schema: purchaseSchema,
  });

  if (!submission.value || submission.intent !== 'submit') {
    return submission;
  }

  const { name, email, title, price, code } = submission.value;

  // TODO: メール送信などの処理
  console.log('注文内容：', { name, email, title, price, code });

  // ✅ 完了後にリダイレクト
  redirect('/thankyou');
}
