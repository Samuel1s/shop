import { Handbag } from '@phosphor-icons/react'
import { HeaderContainer } from '../styles/components/header'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { CartContext } from '@/context/CartProvider'
import logoImg from '../assets/logo.svg'
import Link from 'next/link'
import { Nav } from './Nav'

export function Header() {
  const { productsOnCart } = useContext(CartContext)
  const [showNav, setShowNav] = useState(false)

  function closeNav() {
    setShowNav(false)
  }

  function handleOpenNav() {
    setShowNav(true)
  }

  return (
    <HeaderContainer>
      <Link href={`/`} prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>

      <button onClick={handleOpenNav}>
        <Handbag size={24} weight="bold" />
        {productsOnCart?.length > 0 && <span>{productsOnCart.length}</span>}
      </button>

      <Nav show={showNav} closeNav={closeNav} />
    </HeaderContainer>
  )
}
