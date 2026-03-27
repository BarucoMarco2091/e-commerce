import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router'
import { useContext } from 'react'
import { CartContext } from '../../Contexts/CartContext'

export function Header() {
    const { cartAmount } = useContext(CartContext)

    return (
        <header className='w-full px-1 bg-slate-200'>
            <nav className='w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto'>
                <Link className='font-bold text-2xl' to="/">
                    Dev Shop
                </Link>

                <Link className='relative' to="/cart">
                    <FiShoppingCart size={25} color='#121212' />
                    {cartAmount > 0 && (
                        <span className='absolute -right-3 -top-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs'>
                            {cartAmount}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    )
}