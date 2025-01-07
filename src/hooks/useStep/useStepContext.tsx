import {
  createContext,
  useContext,
  useMemo,
  type FunctionComponent,
  type PropsWithChildren,
} from 'react'
import { Helpers } from './useStepState'

type TContextValues = {
  currentStep: number
  helpers: Helpers
}
interface IStepProviderValues extends PropsWithChildren {
  values: TContextValues
}

const StepContext = createContext<TContextValues | null>(null)

export const useStepContext = () => useContext(StepContext) as NonNullable<TContextValues>
export const StepProvider: FunctionComponent<IStepProviderValues> = ({ values, children }) => {
  const value = useMemo(
    () => ({
      ...values,
    }),
    [values],
  )

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>
}
