"use client"

import type { ReactNode } from "react"
import type { FieldError } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Field, FieldError as RHFError, FieldLabel } from "@/components/ui/field"

export function TextField({
  label, className, required, placeholder, autoComplete, left, type = "text", inputMode, register, error, name,
}: {
  label: string
  name: string
  register: (name: any) => any
  error?: FieldError
  className?: string
  placeholder?: string
  autoComplete?: string
  left?: ReactNode
  type?: string
  inputMode?: "numeric" | "text" | "tel" | "email" | "decimal"
  required?: boolean
}) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <div className="relative">
        {left ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            {left}
          </span>
        ) : null}
        <Input
          id={name}
          name={name}
          type={type}
          inputMode={inputMode}
          className={cn("h-9 px-3", left && "pl-9")}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          required={required}
          {...register(name)}
        />
      </div>
      {error ? <RHFError className="mt-0.5 text-xs">{error.message}</RHFError> : null}
    </Field>
  )
}

export function ControlledField({
  label,
  name,
  value,
  onValueChange,
  error,
  placeholder,
  autoComplete,
  inputMode,
  className,
  prefix,
}: {
  label: string
  name: string
  value: string
  onValueChange: (v: string) => void
  error?: FieldError
  placeholder?: string
  autoComplete?: string
  inputMode?: "numeric" | "text" | "tel" | "email" | "decimal"
  className?: string
  prefix?: string
}) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            {prefix}
          </span>
        ) : null}
        <Input
          id={name}
          inputMode={inputMode}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          onChange={(e) => onValueChange(e.target.value)}
          className={cn("h-9 px-3", prefix && "pl-6")}
        />
      </div>
      {error ? <RHFError className="mt-0.5 text-xs">{error.message}</RHFError> : null}
    </Field>
  )
}

export function NativeSelect({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder,
  className,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  error?: FieldError
  options: (string | { value: string; label: string })[]
  placeholder?: string
  className?: string
}) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <select
        id={name}
        name={name}
        value={value}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-9 w-full min-w-0 rounded-lg border border-input bg-background/30 px-3 text-sm text-foreground outline-none transition-colors",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          value === "" && "text-muted-foreground"
        )}
      >
        {placeholder ? (
          <option value="" disabled className="text-muted-foreground">
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => {
          const isObj = typeof o !== "string"
          const val = isObj ? o.value : o
          const lab = isObj ? o.label : o
          return (
            <option key={val} value={val} className="bg-card text-foreground">
              {lab}
            </option>
          )
        })}
      </select>
      {error ? <RHFError className="mt-0.5 text-xs">{error.message}</RHFError> : null}
    </Field>
  )
}