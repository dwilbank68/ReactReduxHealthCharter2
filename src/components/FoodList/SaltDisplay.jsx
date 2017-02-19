import React from 'react';

const SaltDisplay = ({foodInfo}) => {
    let saltContent = '';
    if (foodInfo.qty) {
        var name = foodInfo.name;

        // truncate to 32 characters
        if (name.length > 32) {
            name = name.substring(0, 32 - 3) + '...';
        }
        console.log('------------------------------------------');
        console.log('foodInfo ',foodInfo);
        console.log('------------------------------------------');
        var qty = foodInfo.qty;
        var unit = foodInfo.unit;
        var salt = foodInfo.salt;
        if (qty > 1 && unit[unit.length-1] !== 's') unit = unit + 's';
        saltContent = name +' - '+ qty +' '+ unit +' - '+ salt + ' mg';
    }

    return (
        <div className="salt-display">
            {saltContent}
        </div>
    );
};

export default SaltDisplay;