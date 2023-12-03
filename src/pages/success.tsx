import {
  ImagesContainer,
  ImageContainer,
  SuccessContainer,
} from '../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '../lib/stripe'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Stripe from 'stripe'

interface ProductProps {
  id: string
  name: string
  images: string
}

interface SuccessProps {
  costumerName: string
  products: ProductProps[]
}

export default function Success({ costumerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ImagesContainer>
          {products.map((product: ProductProps) => {
            return (
              <ImageContainer key={product.id}>
                <Image
                  src={product.images[0]}
                  width={120}
                  height={110}
                  alt={product.name}
                />
              </ImageContainer>
            )
          })}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>
        <p>
          Uhuul <strong>{costumerName}</strong>, sua de{' '}
          <strong>{products.length} camisetas</strong> já está a caminho da sua
          casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const costumerName = session.customer_details?.name
  const products = session.line_items?.data.map((product) => {
    return product.price?.product as Stripe.Product
  })

  return {
    props: {
      costumerName,
      products,
    },
  }
}
