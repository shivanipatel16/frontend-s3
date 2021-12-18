import Button from '@material-ui/core/Button';
import React from "react";
import styled from 'styled-components';

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
    const { item } = props;
    // const [iceLevel, setIceLevel] = useState();
    

    return(
        <Wrapper>
            <h5>Order ID: {item.order_id}</h5>
            <p>Time: {item.datetime}</p>
            <p>Price: {item.total_price}</p> 
        </Wrapper>
);}