import { BsCartPlus } from 'react-icons/bs'
import { api } from "../../Services/api"
import { useState, useEffect, useContext } from "react"
import { CartContext } from '../../Contexts/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

export interface ProductsProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Home() {
    // consumir o contexto
    const { addItemCart } = useContext(CartContext)
    const [products, setProducts] = useState<ProductsProps[]>([])

    useEffect(() => {

        async function getProducts() {
            const response = await api.get("/products")
            console.log(response.data)
            setProducts(response.data)
        }

        getProducts()

    }, [])

    function handleAddCartItem(product: ProductsProps) {
        console.log(product)
        toast.success("Produto adicionado no carrinho.")
        addItemCart(product)
    }

    return (
        <div>
            <main className='w-full max-w-7xl px-4 mx-auto'>
                <h1 className='font-bold text-2xl mb-4 -mt-10 text-center'>Produtos em alta</h1>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
                    {products.map((product) => (
                        <section className='w-full'>
                            <Link to={`/products/${product.id}`}>
                                <img
                                    key={product.id}
                                    className='w-full rounded-lg max-h-70 mb-2'
                                    src={product.cover}
                                    alt={product.title} />
                            </Link>
                            <p className='font-medium mt-1 mb-2'>{product.title}</p>
                            <div className='flex gap-3 items-center'>
                                <strong className='text-zinc-700/90'>{product.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}</strong>
                                <button className='bg-zinc-900 p-1 rounded' onClick={() =>
                                    // pra saber qual é o produto clicado mandar product
                                    handleAddCartItem(product)}>
                                    <BsCartPlus size={20} color='#FFF' />
                                </button>
                            </div>
                        </section>
                    ))}

                </div>
            </main>
        </div>
    )
}