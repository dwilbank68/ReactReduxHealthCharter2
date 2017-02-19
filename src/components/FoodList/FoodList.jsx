import React from 'react';
import FoodListItem from './FoodListItem.jsx';

const FoodList = (props) => {

    const foods =
        props
            .foods
            .map((food) => {
                return (
                    <FoodListItem   onFoodSelect={props.onFoodSelect}
                                    food={food}
                                    key={food.nix_item_id}/>
                )
            });

        return (
            <div className="food-list">
                <ul>
                    {foods}
                </ul>
            </div>
        );

}

export default FoodList;