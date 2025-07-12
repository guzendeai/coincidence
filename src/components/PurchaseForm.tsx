'use client';

import { useForm, getFormProps, getInputProps } from '@conform-to/react';
import { useFormState } from 'react-dom';
import { purchaseSchema } from '@/lib/validation';
import { parse } from '@conform-to/zod';
import { submitOrder } from '@/actions/submitorder';

type Props = {
  postcard?: {
    title: string | null;
    price: string | null;
    code: string | null;
  };
};

export default function PurchaseForm({ postcard }: Props) {
  const [lastResult, action] = useFormState(submitOrder, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parse(formData, { schema: purchaseSchema });
    },
    shouldValidate: 'onBlur',
  });

  return (
    <form {...getFormProps(form)} action={action} className="space-y-4">
      {/* 商品情報（非表示） */}
      <input type="hidden" name="title" value={postcard?.title ?? ''} />
      <input type="hidden" name="price" value={postcard?.price ?? ''} />
      <input type="hidden" name="code" value={postcard?.code ?? ''} />

      <div>
        <label className="block text-sm font-medium">お名前</label>
        <input
          {...getInputProps(fields.name, { type: 'text' })}
          className="border w-full p-2 rounded"
        />
        {fields.name.errors && (
          <p className="text-red-500 text-sm">{fields.name.errors}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">メールアドレス</label>
        <input
          {...getInputProps(fields.email, { type: 'email' })}
          className="border w-full p-2 rounded"
        />
        {fields.email.errors && (
          <p className="text-red-500 text-sm">{fields.email.errors}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        注文する
      </button>
    </form>
  );
}
