
import CartItem from './cartItem';
// import './cart.css'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import axios from 'axios'; 
import Cookies from 'universal-cookie';

const Wrapper = styled.aside`
  width: 800px;
  padding: 20px;

`;

// type Props = {
//     cartItems: CartItemType[];
//     addToCart: (clickedItem: CartItemType) => void;
//     removeFromCart: (id: number) => void;
// };

export default function Cart(props){
    const { cartItems, addToCart, removeFromCart } = props;
    let cookies = new Cookies();
    let userID = cookies.get("userId");
    console.log(userID);
    const [postId, setPostID] = useState();
    const calculateTotal = (items) =>
        items.reduce((ack, item) => ack + item.amount * item.price , 0);
    
    // const userId = 30;
    const handleSubmit = (e) => {
        // product.topping_id = e.target.topping_id;
        // const topping_price = toppings.find(x=> x.topping_id === e.target.topping_id).price;
        // console.log(toppings.find(x=> x.topping_id === e.target.topping_id));
        console.log(e);
        // product.price = e.target.value;
        // useEffect(() => {
        //     (async () => {
        //         const requestOptions = {
        //             method: 'POST',
        //             headers: {'Content-Type': 'application/json'},
        //             body: JSON.stringify({

        //             })
        //         }
        //         const response = await fetch(`http://172.20.10.6:5000/api/orders/${userId}`,requestOptions)
        //         const data = await response.json()
        //         setPostID(data.id)
        //         })()
        //     },[]);
        // e.preventDefault();
        const now = new Date().toLocaleString();
        const total_price =  Math.round((calculateTotal(cartItems) + Number.EPSILON) * 100) / 100;
        // const order = {
        //     total_price: total_price,
        //     datetime: now,
        //     order: cartItems
        // }
        // console.log(order);
        let orderInfo = cartItems.map(item=>({
            "product_id": item.product_id,
            "quantity": item.amount,
            "topping_id": parseInt(item.topping_id),
            "ice_level": item.iceLevel,
            "price": item.price
        }));

        console.log(orderInfo);
        let order = {"total_price": total_price,
                "datetime": now,
                "order": orderInfo};

        // let input = JSON.stringify(orderInfo);
        // console.log(input);
        axios.post(`http://192.168.0.247:5000/api/orders/${userID}`, order ).then(res=>{
            console.log(res);
        }).catch((error) => {
            alert(error.response.data);
            // if (error.response.status == 400){
            // };
        });
        alert(`Order Placed. Total Price: ${total_price}`);
    };

    return (
        <Wrapper>
            <h3>Your Shopping Cart</h3>
            {/* <div><pre>{ JSON.stringify(orderInfo) }</pre></div>) */}
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.product_id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h4>Total Price: ${calculateTotal(cartItems).toFixed(2)}</h4>
            <Button className='button' onClick={handleSubmit}>
                CheckOut
            </Button>
        </Wrapper>
    );
};

// export default Cart;