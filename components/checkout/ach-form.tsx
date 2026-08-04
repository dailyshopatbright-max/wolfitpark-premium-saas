"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Landmark, Hash, Lock } from "lucide-react"
import {
  ACH_SCHEMA,
  ACCOUNT_TYPES,
  formatMoney,
  type ACHOutput,
} from "@/components/checkout/validation"
import { TextField, ControlledField, NativeSelect } from "@/components/checkout/fields"
import { AuthorizationSection } from "@/components/checkout/authorization-section"
import { PaymentButton } from "@/components/checkout/payment-button"
import { FieldGroup } from "@/components/ui/field"

export function ACHForm({
  amount,
  invoiceNumber,
  processing,
  onPay,
}: {
  amount: number
  invoiceNumber: string
  processing: boolean
  onPay: (data: ACHOutput) => void
}) {
  const [authChecked, setAuthChecked] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(ACH_SCHEMA),
    mode: "onTouched",
    defaultValues: {
      customerName: "",
      companyName: "",
      email: "",
      phone: "",
      country: "United States",
      state: "",
      city: "",
      zip: "",
      routingNumber: "",
      accountNumber: "",
      confirmAccountNumber: "",
      accountType: "checking",
      bankName: "",
      invoiceNumber,
      amount: amount.toFixed(2),
      memo: "",
      referenceNumber: "",
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => onPay(data as ACHOutput))} noValidate>
      <FieldGroup>
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
          <Landmark className="size-3.5" />
          Bank account details
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          <TextField label="Customer name" name="customerName" required register={register} error={errors.customerName} autoComplete="name" placeholder="Jane Smith" />
          <TextField label="Company name (optional)" name="companyName" register={register} error={errors.companyName} autoComplete="organization" placeholder="Wolfitpark LLC" />
          <TextField label="Email address" name="email" type="email" required register={register} error={errors.email} autoComplete="email" placeholder="jane@company.com" />
          <TextField label="Phone number" name="phone" type="tel" required register={register} error={errors.phone} autoComplete="tel" placeholder="+1 (555) 000-0000" />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
          <Hash className="size-3.5" />
          Billing address
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          <NativeSelect
            label="Country"
            name="country"
            value={watch("country")}
            onChange={(v) => setValue("country", v, { shouldTouch: true, shouldValidate: true })}
            error={errors.country}
            options={["United States"]}
          />
          <TextField label="State" name="state" required register={register} error={errors.state} placeholder="California" />
          <TextField label="City" name="city" required register={register} error={errors.city} placeholder="San Francisco" />
          <TextField label="ZIP code" name="zip" inputMode="numeric" required register={register} error={errors.zip} autoComplete="postal-code" placeholder="94103" />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
          <Lock className="size-3.5" />
          Bank account
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          <ControlledField
            label="Routing number"
            name="routingNumber"
            value={watch("routingNumber")}
            onValueChange={(v) => setValue("routingNumber", v.replace(/[^\d]/g, "").slice(0, 9), { shouldTouch: true })}
            error={errors.routingNumber}
            inputMode="numeric"
            placeholder="9-digit ABA number"
          />
          <NativeSelect
            label="Account type"
            name="accountType"
            value={watch("accountType")}
            onChange={(v) => setValue("accountType", v as any)}
            error={errors.accountType}
            options={ACCOUNT_TYPES}
          />
          <ControlledField
            label="Account number"
            name="accountNumber"
            value={watch("accountNumber")}
            onValueChange={(v) => setValue("accountNumber", v.replace(/[^\d]/g, "").slice(0, 17), { shouldTouch: true })}
            error={errors.accountNumber}
            inputMode="numeric"
            placeholder="Account number"
          />
          <ControlledField
            label="Confirm account number"
            name="confirmAccountNumber"
            value={watch("confirmAccountNumber")}
            onValueChange={(v) => setValue("confirmAccountNumber", v.replace(/[^\d]/g, "").slice(0, 17), { shouldTouch: true })}
            error={errors.confirmAccountNumber}
            inputMode="numeric"
            placeholder="Re-enter account number"
          />
          <TextField label="Bank name (optional)" name="bankName" register={register} error={errors.bankName} autoComplete="off" placeholder="e.g. Chase" />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
          <Hash className="size-3.5" />
          Payment details
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          <ControlledField
            label="Invoice number"
            name="invoiceNumber"
            value={watch("invoiceNumber")}
            onValueChange={(v) => setValue("invoiceNumber", v, { shouldTouch: true })}
            error={errors.invoiceNumber}
            placeholder="INV-0001"
          />
          <ControlledField
            label="Payment amount"
            name="amount"
            value={watch("amount")}
            onValueChange={(v) => setValue("amount", v.replace(/[^0-9.]/g, ""), { shouldTouch: true })}
            error={errors.amount}
            inputMode="decimal"
            prefix="$"
          />
          <TextField label="Memo (optional)" name="memo" register={register} error={errors.memo} placeholder="Payment for services" />
          <TextField label="Reference number (optional)" name="referenceNumber" register={register} error={errors.referenceNumber} placeholder="Client ref #" />
        </div>

        <AuthorizationSection checked={authChecked} onChange={setAuthChecked} />

        <div className="sticky bottom-4 z-20">
          <PaymentButton
            type="submit"
            method="ach"
            processing={processing}
            disabled={!isValid || !authChecked}
            hint={`${formatMoney(amount)} will be debited from your bank account`}
          />
        </div>
      </FieldGroup>
    </form>
  )
}