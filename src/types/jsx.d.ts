declare module '*.jsx' {
  import { FC } from 'react'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: FC<any>
  export default component
}
