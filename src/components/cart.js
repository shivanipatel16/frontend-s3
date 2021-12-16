
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
    const { cartItems, addToCart, removeFromCart, confirmItem } = props;
    let cookies = new Cookies();
    let userID = cookies.get("userId");
    const calculateTotal = (items) =>
        items.reduce((ack, item) => ack + item.amount * item.price , 0);
    
    // const userId = 30;
    const handleSubmit = (e) => {
        // check if all the items are confirmed
        let ready = cartItems.every(function (e) {
            return e.isConfirmed;
        });

        if (ready){
            const now = new Date().toLocaleString();
            const total_price =  Math.round((calculateTotal(cartItems) + Number.EPSILON) * 100) / 100;
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


            axios.post(`https://kbjdvhv2je.execute-api.us-east-2.amazonaws.com/dev/orders/${userID}`, order ).then(res=>{
                console.log(res);
            }).catch((error) => {
                alert(error.response.data);
            });
            alert(`Order Placed. Total Price: ${total_price}`);
        }
        else{
            alert('Please confirm all your items.');
        }
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
                    confirmItem={confirmItem}
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