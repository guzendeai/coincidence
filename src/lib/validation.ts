import { z } from 'zod';

export const purchaseSchema = z.object({
  name: z.string().min(1, 'お名前は必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
});
