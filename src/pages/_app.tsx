import { Container } from '../styles/pages/app'
import { globalStyles } from '../styles/global'
import { AppProps } from 'next/app'
import { CartContextProvider } from '@/context/CartProvider'
import { Header } from '@/components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartContextProvider>
        <Header />
        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
