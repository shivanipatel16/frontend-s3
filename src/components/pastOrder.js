import OrderItem from './orderItem';
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

export default function PastOrder(props){
    const {products, toppings } = props;
    let cookies = new Cookies();
    let user_id = cookies.get("userId");
    const[orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`https://kbjdvhv2je.execute-api.us-east-2.amazonaws.com/dev/orders/${user_id}`,{
                headers: {'Content-Type': 'application/json'},
            })
            const data = await response.json()
            setOrderItems(data.data);
            })()
        },[user_id]);
    

    return (
        <Wrapper>
            <h3> Your Past Orders </h3>
            {orderItems.length === 0 ? <p>No past orders.</p> : null}
            {orderItems.map(item => (
                <OrderItem
                    key={item.order_id}
                    item={item}
                    products = {products}
                    toppings = {toppings}

                />
            ))}
            {/* <h4>Total Price: ${calculateTotal(cartItems).toFixed(2)}</h4> */}
            {/* <Button className='button' onClick={handleSubmit}>
                CheckOut
            </Button> */}
        </Wrapper>
    );
};