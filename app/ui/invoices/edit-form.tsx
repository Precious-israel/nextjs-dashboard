'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { useActionState } from 'react';
import { updateInvoice, State } from '@/app/lib/actions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice?: InvoiceForm;
  customers: CustomerField[];
}) {
  // --------------------------
  // Hooks must always be called
  // --------------------------
  const initialState: State = { message: null, errors: { customerId: [], amount: [], status: [] } };
  const updateInvoiceAction = async (state: State, formData: FormData) =>
    updateInvoice(invoice!.id, state, formData); // wrap to match useActionState signature
  const [state, formAction] = useActionState(updateInvoiceAction, initialState);

  if (!invoice) {
    return <p>Loading invoice...</p>;
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue={invoice.customer_id}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId?.map((err) => (
              <p key={err} className="mt-2 text-sm text-red-500">{err}</p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Invoice Amount
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              defaultValue={invoice.amount}
              placeholder="Enter USD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="amount-error"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount?.map((err) => (
              <p key={err} className="mt-2 text-sm text-red-500">{err}</p>
            ))}
          </div>
        </div>

        {/* Status */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">Invoice Status</legend>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="pending"
                name="status"
                value="pending"
                defaultChecked={invoice.status === 'pending'}
                className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-describedby="status-error"
              />
              <label htmlFor="pending" className="ml-2 text-sm font-medium flex items-center gap-1">
                Pending <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paid"
                name="status"
                value="paid"
                defaultChecked={invoice.status === 'paid'}
                className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-describedby="status-error"
              />
              <label htmlFor="paid" className="ml-2 text-sm font-medium text-green-600 flex items-center gap-1">
                Paid <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status?.map((err) => (
              <p key={err} className="mt-2 text-sm text-red-500">{err}</p>
            ))}
          </div>
        </fieldset>

        {/* Form-level message */}
        {state.message && (
          <div className="mt-4 rounded-md bg-red-50 p-3 border border-red-200">
            <p className="text-sm text-red-600">{state.message}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
