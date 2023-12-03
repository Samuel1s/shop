import {
  ImageContainer,
  InfoContainer,
  NavContainer,
  ProductContainer,
  ProductsContainer,
} from '../styles/components/nav'

import Image from 'next/image'

import React, { useContext } from 'react'
import { CartContext } from '@/context/CartProvider'
import { X } from '@phosphor-icons/react'

interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: number
}

interface NavProps {
  show: boolean
  closeNav: () => void
}

export function Nav({ show, closeNav }: NavProps) {
  const { productsOnCart, removeProduct, checkout } = useContext(CartContext)

  const total = productsOnCart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0,
  )

  function handleCloseNav() {
    closeNav()
  }

  function handleRemoveProduct(productId: ProductProps['id']) {
    removeProduct(productId)
  }

  return (
    <NavContainer transform={show ? 'show' : 'hidden'}>
      <header>
        <h4>Sacola de Compras</h4>
        <button onClick={handleCloseNav}>
          <X size={24} weight="bold" />
        </button>
      </header>
      <ProductsContainer>
        {productsOnCart.map((product: ProductProps) => (
          <ProductContainer key={product.id}>
            <ImageContainer>
              <Image
                src={product.imageUrl}
                height={94.79}
                width={94.79}
                alt={product.name}
              />
            </ImageContainer>
            <div>
              <h4>{product.name}</h4>
              <strong>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}
              </strong>
              <button onClick={() => handleRemoveProduct(product.id)}>
                Remover
              </button>
            </div>
          </ProductContainer>
        ))}
      </ProductsContainer>
      <InfoContainer>
        <div>
          <span>Quantidade</span>
          <span>{productsOnCart.length} itens</span>
        </div>
        <div>
          <strong>Valor total</strong>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(total)}
          </strong>
        </div>
      </InfoContainer>
      <button onClick={checkout}>Finalizar Compra</button>
    </NavContainer>
  )
}
