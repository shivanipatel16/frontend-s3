import Button from '@material-ui/core/Button';
// Types
// import { CartItemType } from '../../App';
// Styles
// import { Wrapper } from './CartItem.styles';
import { ToppingDropdown, SizeDropdown, IceDropdown } from './toppings';
import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
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
`;


export default function CartItem(props){
    const { item, addToCart, removeFromCart } = props;
    // const [iceLevel, setIceLevel] = useState();
    

    return(
        <Wrapper>
            <h4>{item.product_name}</h4>
            <div className='information'>
                {/* <p>Size: ${item.size}</p> */}
                {/* <p>Price: ${item.price}</p>
                <p>{item.topping_id}</p> */}
                <p>Price: ${(item.amount * (item.price)).toFixed(2)}</p>
            </div>
            <div className='buttons'>
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => removeFromCart(item.product_id)}
                >
                    -
                </Button>
                <h6>{item.amount}</h6>
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => addToCart(item)}
                >
                    +
                </Button>
                <IceDropdown product={item}/>
                <SizeDropdown product={item}/>
                <ToppingDropdown product={item} />
            </div>
        </Wrapper>
);}