import * as React from "react";
import Item from "./Item";
// import { DropdownWrapper, Wrapper, ActivatorButton, DropdownList } from "./Toppings.styles";
// import {useQuery} from "react-query";
// import {CartItemType} from "../../App";
// import Grid from "@material-ui/core/Grid";
// import Item from "../Item/Item";
// import CartItem from "../CartItem/CartItem";
// import { replaceEqualDeep } from "react-query/types/core/utils";
// import Select from 'react';

// interface Topping {
//     topping_id: number;
//     topping_name: string;
//     price: number;
// }


export function ToppingDropdown(props){
    const [toppings, setToppings] = React.useState([]);
    const {product} = props;


    React.useEffect(() => {
        ;(async () => {
            const response = await fetch('http://172.20.10.6:5000/api/menu/topping',{
                headers: {'Content-Type': 'application/json'},
            })

            const data = await response.json()
            setToppings(data.data)
            })()
        });
    // console.log(product.price);
    const handleChange = (e) => {
        product.topping_id = e.target.value;
        //add topping price
        var price = product.price;
        product.price = parseFloat(price) + 0.5;
    };
    // console.log(product.price);

    return (
        <select onChange={handleChange}>
            {/* <option value="" key=""> Add Toppings</option> */}
            {toppings.map(toppings => (
                
                <option
                    key={toppings.topping_id}
                    value={toppings.topping_id}
                >
                    {toppings.topping_name}: ${toppings.price}
                </option>
            ))}

        </select>

    );
}


export function SizeDropdown(props){
    const {product} = props;

    const handleChange = (e) => {
        product.price = e.target.value;
    };

    return (
        <select onChange={handleChange}>
            <option value={product.price_m}>Medium (${product.price_m})</option>    
            <option value={product.price_l}>Large (${product.price_l})</option>
        </select>
    );
}

export function IceDropdown(props){
    const {product} = props;

    const handleChange = (e) => {
        product.iceLevel = e.target.value;
    };

    return (
        <select id='iceLevel' onChange={handleChange}>
            <option value="Normal Ice"> Normal Ice </option>
            <option value="No Ice">No Ice </option>    
            <option value="Less Ice">Less Ice </option>
            <option value="Hot"> Hot </option>
        </select>
    );
    
}