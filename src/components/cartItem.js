import Button from '@material-ui/core/Button';
import { ToppingDropdown, SizeDropdown, IceDropdown,SugarDropdown } from './toppings';
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


export default function CartItem(props){
    const { item, addToCart, removeFromCart, confirmItem} = props;
    // const [iceLevel, setIceLevel] = useState();
    

    return(
        <Wrapper>
            <h4>{item.product_name}</h4>
            <div className='information'>
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
                <SizeDropdown product={item}/>
                <IceDropdown product={item}/>
                {/* <SugarDropdown product={item} /> */}
                <ToppingDropdown product={item} />
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => confirmItem(item)}
                >
                    ✓
                </Button>
            </div>
        </Wrapper>
);}