import { createContext, type ReactNode, useState } from "react";
import { type ProductsProps } from "../Pages/Home";

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductsProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string;
}

interface CartProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps {
    // ReactNode é componente react
    children: ReactNode;
}

// criar contexto de carrinho
export const CartContext = createContext({} as CartContextData)

// criar provider
function CartProvider({ children }: CartProviderProps) {
    // useState para armazenar lista vazia
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

    // função de adicionar item no carrinho deve ser criada no cartcontext porque criamos um contexto pro carrinho 
    function addItemCart(newItem: ProductsProps) {
        // verificar se já não existe o item no carrinho 
        // percorre pra ver se tem algum item.id === newItem.id e devolve a posição se tiver 
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        if(indexItem !== -1) {
            // se entrou aqui somamos +1 na quantidade e calculamos o total do carrinho 
            let cartList = cart

            // [indexItem] acessar a posição do item que já tem no carrinho
            cartList[indexItem].amount = cartList[indexItem].amount + 1
            // calculo do total
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price

            setCart(cartList)
            totalResultCart(cartList)
            // parar a execução do codigo porque só vai entrar no if se já tiver o produto no carrinho  senão só adiciona o novo item no carrinho 
            return;
        }

        // adicionar o  item na nossa lista 
        let data = {
            // ...newItem recebendo o produto que mandou 
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        // garantindo que pegou todos os produtos e colocando a mais o que enviou
        setCart(products => [...products, data])
        // ...cart -> pegar tudo o que já tem e adiciona o data
        totalResultCart([...cart, data])
    }

    // product -> item que você quer remover 
    function removeItemCart(product: CartProps) {
        // enncontrar na lista
        const indexItem = cart.findIndex(item => item.id === product.id)
        // [indexItem] -> acessando o item que você quer remover
        if(cart[indexItem]?.amount > 1) {
            let cartList = cart
            cartList[indexItem].amount = cartList[indexItem].amount - 1
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price
            setCart(cartList)
            totalResultCart(cartList)
            return;
        }
        // remove da lista
        // retorna na variável removeItem tudo que passa pela verificação 
        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem)
        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]) {
        let myCart = items
        // percorre o array pegando o subtotal adicionando aos outros subtotais
        //reduce((acumulador, objeto : que é o item) 
        let result = myCart.reduce((acc, obj) =>{return acc + obj.total}, 0)
        const formatedResult = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        setTotal(formatedResult)
    }

    return(
        // value está sempre dentro de CartContextData, contexto fica em volta da aplicação e dentro é a aplicação  renderizada
        <CartContext.Provider value={{ cart, cartAmount: cart.length, addItemCart, removeItemCart, total }}>
        
            {children}
        </CartContext.Provider>
    )
}

// {children} é o que está dentro do provider
export default CartProvider;