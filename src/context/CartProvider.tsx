import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  defaultPriceId?: string
  quantity?: number
}

export interface CartContextType {
  productsOnCart: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: Product['id']) => void
  checkout: () => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
  title?: string
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [productsOnCart, setProductsOnCart] = useState<Product[]>([])
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  function addProduct(product: Product) {
    const { id: productId } = product

    const addOnlyOneTimeSameProduct = productsOnCart.some(
      (product) => product.id === productId,
    )

    if (!addOnlyOneTimeSameProduct) {
      setProductsOnCart((state) => [...state, product])
    } else {
      alert('The product has already been added')
    }
  }

  function removeProduct(productId: Product['id']) {
    const newArrayProducts = productsOnCart.filter(
      (product) => product.id !== productId,
    )

    setProductsOnCart(newArrayProducts)
  }

  async function checkout() {
    try {
      setIsCreatingCheckoutSession(true)

      const productsToCheckOut = productsOnCart.map((product: Product) => {
        return {
          price: product.defaultPriceId,
          quantity: 1,
        }
      })

      const response = await axios.post('/api/checkout', {
        productsToCheckOut,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CartContext.Provider
      value={{
        productsOnCart,
        addProduct,
        removeProduct,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
