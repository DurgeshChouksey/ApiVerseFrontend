// src/components/otp-input.tsx
"use client"

import * as React from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

interface OtpInputProps {
  onChange?: (value: string) => void
}

export function OtpInput({ onChange }: OtpInputProps) {
  const [value, setValue] = React.useState("")

  const handleChange = (val: string) => {
    setValue(val)
    if (onChange) onChange(val) // send value back to parent
  }

  return (
    <div className="space-y-2 py-5">
      <InputOTP maxLength={6} value={value} onChange={handleChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? <>Enter your one-time password.</> : <>You entered: {value}</>}
      </div>
    </div>
  )
}
