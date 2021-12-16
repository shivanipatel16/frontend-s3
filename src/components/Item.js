import Button from "@material-ui/core/Button";

// import { CartItemType } from "../../App";
// import { Wrapper } from "./Item.style";
import React from "react";
// import './Item.css'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  padding: 20px;
  
  button{
    border-radius: 0 0 20px 20px;
  }
  
  
  div {
    front-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
  
`;

// type Props = {
//     item: CartItemType;
//     handleAddToCart: (clickedItem: CartItemType) => void;

// }
function Item(props) {
  const { item, handleAddToCart } = props;
  return (
      <Wrapper>
        <h4>{item.product_name}</h4>
        <h4>Price${item.price_m}</h4>
        <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
      </Wrapper>
  );
}
export default Item;