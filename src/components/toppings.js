import * as React from "react";
import Item from "./Item";
import {Cookies} from 'react-cookie';


export function ToppingDropdown(props){
    const [toppings, setToppings] = React.useState([]);
    const {product} = props;
    const cookie = new Cookies();
    const user_id = cookie.get("user_id");


    React.useEffect(() => {
        ;(async () => {
            const response = await fetch('https://kbjdvhv2je.execute-api.us-east-2.amazonaws.com/dev/menu/topping',{
                headers: {'Content-Type': 'application/json'},
            })

            const data = await response.json();
            setToppings(data.data);
            })()
        },[user_id]);
    // console.log(product.price);


    const handleChange = (e) => {
        product.topping_id = parseInt(e.target.value);
        //add topping price
        var topping = toppings.find(topping => topping.topping_id === parseInt(e.target.value));
        if (topping){
            var topping_price = topping.price;
        }else{
            var topping_price = 0;
        }
        var price = product.price;
        product.price = parseFloat(price) + parseFloat(topping_price);
    };


    return (
        <select onChange={handleChange}>
            <option value="" key=""> Add Toppings</option>
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
            <option value="" key=""> Choose Size</option>
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
            <option value="" key="">Choose Ice Level</option>
            <option value="Normal Ice"> Normal Ice </option>
            <option value="No Ice">No Ice </option>    
            <option value="Less Ice">Less Ice </option>
            <option value="Hot"> Hot </option>
        </select>
    );
    
}


export function SugarDropdown(props){
    const {product} = props;

    const handleChange = (e) => {
        product.sugarLevel = e.target.value;
    };

    return (
        <select id='sugar-level' onChange={handleChange}>
            <option value="" key="">Choose Sugar Level</option>
            <option value="100%"> 100% </option>
            <option value="70%"> 70% </option>    
            <option value="50%"> 50% </option>
            <option value="30%"> 30% </option>
            <option value="0%"> 0% </option>
        </select>
    );
    
}