import React from 'react';

const FoodListItem = ({food, onFoodSelect}) => {
    const imageUrl = food.photo;

    return (
        <li onClick={() => onFoodSelect(food)} className="list-group-item">
            <div className="video-list media">
                <div className="media-body">
                    <div className="media-heading brand">{food.brand_name}</div>
                    <div className="food">{food.food_name}</div>
                </div>
                <div className="media-right">
                    <img className="media-object img-thumbnail" src={imageUrl} />
                </div>
            </div>
        </li>
    );
};

export default FoodListItem;