import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import {useState} from 'react'
// import {useQuery} from 'react-query'
// import Item from "./components/Item/Item"
// import Cart from "./components/Cart/Cart"
import Drawer from '@material-ui/core/Drawer'
// import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
// import Header from './components/Header'


//styles
// import {Wrapper, StyledButton} from './OrderMenu.styles';
//Types
// export type CartItemType = {
//   product_id: number;
//   product_name: string;
//   price_m: number;
//   price_l: number;
//   price: number;
//   amount: number;
// }


function OrderMenu() {
  const[cartOpen, setCartOpen] = useState(false);
  // const CartItemType = {product_id, product_name, price_m, price_l, price, amount, size};
  const[cartItems, setCartItems] = useState([]);
  const[menuItems, setMenuItems] = useState([]);

  React.useEffect(() => {
      ;(async () => {
          const response = await fetch('http://172.20.10.6:5000/api/menu/product',{
              headers: {'Content-Type': 'application/json'},
          })
          const data = await response.json()
          setMenuItems(data.data)
          console.log(menuItems) 
          })()
      });



  const getTotalItems = (items) => items.reduce((ack, item) => ack + item.amount, 0);


  const handleAddToCart = (clickedItem) => {
    // clickedItem.size = size;
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.product_id === clickedItem.product_id)

      if (isItemInCart) {
        return prev.map(item =>
            item.product_id === clickedItem.product_id
                ? { ...item, amount: item.amount + 1 }
                : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (product_id) => {
    setCartItems(prev =>
        prev.reduce((ack, item) => {
          if (item.product_id === product_id) {
            if (item.amount === 1) return ack;
            return [...ack, { ...item, amount: item.amount - 1 }];
          } else {
            return [...ack, item];
          }
        })
    );
  };

  return (
    <div> 
        <h1>yes</h1>
      <Drawer anchor='right' open={cartOpen} onClose={()=> setCartOpen(false)}>
        {/* <Cart cartItems = {cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/> */}
      </Drawer>
      <IconButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>

      </IconButton>
      <Grid container spacing={3}>
        {menuItems.map(item => (
            <Grid item key = {item.product_id} xs={12} sm={4}>
              {/* <Item item={item} handleAddToCart ={handleAddToCart} /> */}
            </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default OrderMenu;