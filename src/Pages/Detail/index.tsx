import { useParams } from "react-router"
import { BsCartPlus } from 'react-icons/bs'
import { useEffect, useState, useContext } from "react"
import { api } from "../../Services/api"
import { CartContext } from "../../Contexts/CartContext"
import toast from "react-hot-toast"

interface ProductsProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Detail() {
    const { id } = useParams()
    const { addItemCart } = useContext(CartContext)
    const [products, setProducts] = useState<ProductsProps>()

    useEffect(() => {

        async function loadProducts() {
            const response = await api.get(`/products/${id}`)
            console.log(response.data)
            setProducts(response.data)
        }

        loadProducts()

    }, [id])

    function handleAddCartItem(products: ProductsProps) {
        addItemCart(products)
        toast.success("Produto adicionado no carrinho.")
    }

    return (
        <main className="w-full max-w-7xl px-4 mx-auto my-6">
            {products && (
                <section className="w-full">
                    <div className="flex flex-col lg:flex-row">
                        <img
                        className="flex-1 w-full max-h-72 object-contain" 
                        src={products?.cover} 
                        alt={products?.title} />
                        <div className="flex-1">
                            <p className="font-bold text-2xl mt-4 m-2">{products?.title}</p>
                            <p className="my-4">{products?.description}</p>
                            <strong className="text-zinc-700/90 text-xl">
                                {products?.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </strong>
                            <button className="bg-zinc-900 p-1 rounded ml-3" onClick={() => handleAddCartItem(products)}>
                                <BsCartPlus size={20} color='#FFF' />
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}