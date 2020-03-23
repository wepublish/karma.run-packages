import React, {ChangeEvent, createContext, ReactNode} from 'react'

export interface RadioGroupContextState {
  name?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioGroupContext = createContext<RadioGroupContextState | null>(null)

export interface RadioGroupProps {
  name: string

  value?: string
  children?: ReactNode

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export function RadioGroup({name, value, children, onChange}: RadioGroupProps) {
  return (
    <div>
      <RadioGroupContext.Provider value={{value, name, onChange}}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  )
}
