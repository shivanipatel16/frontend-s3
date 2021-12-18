import Button from '@material-ui/core/Button';
import React from "react";
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

const Wrapper = styled.div`

    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;
    div {
    flex: 1;
    }
    .information,
    .buttons {
    display: flex;
    justify-content: space-between;
    maxWidth: '30px';
    maxHeight: '30px';
        minWidth: '30px';
        minHeight: '30px';
    }
    h6 {
      padding: 20px;
  }
`;


export default function OrderItem(props){
    const { item, products, toppings } = props;
    const [expanded, setExpanded] = React.useState(false);

    console.log(toppings);
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const productName = (productId) => {
        return products.find(product => product.product_id === parseInt(productId)).product_name;
    }

    const toppingName = (toppingID) => {
        var topping =  toppings.find(topping => topping.topping_id === parseInt(toppingID));
        if (topping){
            return topping.topping_name;
        }else{
            return ""
        }

    }

    return (
      <Wrapper>
        <h5>Order ID: {item.order_id}</h5>
        <p>Oder Time: {item.datetime}</p>
        <p>Total Price: {item.total_price}</p>
        <div>
            {item.order.map(orderItem => (
                <div>
                    <p> <b>Product: </b>{productName(orderItem.product_id)}  <b>Quantity: </b> {orderItem.quantity}  <b> Price: </b> ${orderItem.price}  <b>Topping: </b>{toppingName(orderItem.topping_id)}  <b>Ice Level: </b>{orderItem.ice_level} </p>
                </div>
            ))}
        </div>
      </Wrapper>
    );}