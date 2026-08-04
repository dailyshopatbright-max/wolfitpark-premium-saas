"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"
import {
  CARD_SCHEMA,
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
  formatMoney,
  type CardOutput,
} from "@/components/checkout/validation"
import { TextField, ControlledField, NativeSelect } from "@/components/checkout/fields"
import { PaymentButton } from "@/components/checkout/payment-button"
import { FieldGroup } from "@/components/ui/field"
import { cn } from "@/lib/utils"

const brandStyles: Record<string, { background: string; color: string; text: string; border?: string }> = {
  visa: { background: "linear-gradient(135deg,#1a1f71,#5b78c7)", color: "#fff", text: "VISA" },
  mastercard: { background: "linear-gradient(135deg,#eb001b,#f79e1b,#ff5f00)", color: "#fff", text: "Mastercard" },
  amex: { background: "linear-gradient(135deg,#2e77bc,#006fd6)", color: "#fff", text: "AMEX" },
  discover: { background: "linear-gradient(135deg,#20124d,#f76b1c)", color: "#fff", text: "DISCOVER" },
  unknown: {
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    text: "CARD",
    border: "1px solid rgba(255,255,255,0.2)",
  },
}

export function CardForm({
  amount,
  invoiceNumber,
  processing,
  onPay,
}: {
  amount: number
  invoiceNumber: string
  processing: boolean
  onPay: (data: CardOutput) => void
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(CARD_SCHEMA),
    mode: "onTouched",
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      zip: "",
      country: "United States",
      billingAddress: "",
      email: "",
      phone: "",
      saveCard: false,
    },
  })

  const cardNumber = watch("cardNumber")
  const brand = detectCardBrand(cardNumber.replace(/\s/g, ""))
  const brandStyle = brandStyles[brand]

  return (
    <form onSubmit={handleSubmit((data) => onPay(data as CardOutput))} noValidate>
      <FieldGroup>
        <div>
          <ControlledField
            label="Card number"
            name="cardNumber"
            value={cardNumber}
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            error={errors.cardNumber}
            onValueChange={(v) => setValue("cardNumber", formatCardNumber(v), { shouldTouch: true })}
          />
          <div className="mt-1.5">
            <motion.span
              key={brand}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex w-fit items-center rounded-md border px-2 py-1 text-[10px] font-bold tracking-wide"
              style={brandStyle}
            >
              {brandStyle.text}
            </motion.span>
          </div>
        </div>

        <TextField
          label="Cardholder name"
          name="cardholderName"
          register={register}
          error={errors.cardholderName}
          required
          autoComplete="cc-name"
          placeholder="Jane Smith"
        />

        <div className="grid gap-1 sm:grid-cols-3">
          <ControlledField
            label="Expiry"
            name="expiry"
            value={watch("expiry")}
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM / YY"
            error={errors.expiry}
            onValueChange={(v) => setValue("expiry", formatExpiry(v), { shouldTouch: true })}
          />
          <ControlledField
            label="CVV"
            name="cvv"
            value={watch("cvv")}
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder={brand === "amex" ? "4 digits" : "3 digits"}
            error={errors.cvv}
            onValueChange={(v) => setValue("cvv", v.replace(/[^\d]/g, "").slice(0, 4), { shouldTouch: true })}
          />
          <ControlledField
            label="ZIP code"
            name="zip"
            value={watch("zip")}
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="94103"
            error={errors.zip}
            onValueChange={(v) => setValue("zip", v, { shouldTouch: true })}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
          <CreditCard className="size-3.5" />
          Billing details
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          <ControlledField
            label="Billing address"
            name="billingAddress"
            value={watch("billingAddress")}
            autoComplete="street-address"
            placeholder="123 Market St"
            error={errors.billingAddress}
            onValueChange={(v) => setValue("billingAddress", v, { shouldTouch: true })}
          />
          <NativeSelect
            label="Country"
            name="country"
            value={watch("country")}
            onChange={(v) => setValue("country", v, { shouldTouch: true, shouldValidate: true })}
            error={errors.country}
            options={["United States"]}
          />
          <TextField label="Email" name="email" type="email" required register={register} error={errors.email} autoComplete="email" placeholder="jane@company.com" />
          <TextField label="Phone" name="phone" type="tel" required register={register} error={errors.phone} autoComplete="tel" placeholder="+1 (555) 000-0000" />
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground select-none">
          <motion.button
            type="button"
            role="checkbox"
            aria-checked={!!watch("saveCard")}
            onClick={() => setValue("saveCard", !watch("saveCard"))}
            whileTap={{ scale: 0.92 }}
            className={cn(
              "grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
              watch("saveCard")
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background/40"
            )}
          >
            {watch("saveCard") ? <CheckMark /> : null}
          </motion.button>
          Save this card for faster checkout.
        </label>

        <PaymentButton
          type="submit"
          method="card"
          processing={processing}
          disabled={!isValid}
          hint={`Charge ${formatMoney(amount)} to your card`}
          invoiceNumber={invoiceNumber}
        />
      </FieldGroup>
    </form>
  )
}

function CheckMark() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
      <path d="M2 6.5 4.5 9 10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}