// import axios from 'axios';
// import {
//     LOAD_FOODS
// } from './types';
//
// const ROOT_URL = 'https://trackapi.nutritionix.com/v2/search/instant?query=';
//
// export function setSearchText(text) {
//     return function (dispatch) {
//         axios
//             .get(ROOT_URL + text, {
//                 headers: {
//                     'Content-Type':'application/json',
//                     'x-app-id': process.env.X_APP_ID,
//                     'x-app-key': process.env.X_APP_KEY
//                 }
//             })
//             .then(
//                 (response) => {
//                     var list = response.data.branded;
//                     var filteredList = list.map((obj) => {
//                         return {
//                             brand_name: obj.brand_name,
//                             food_name: obj.food_name,
//                             nix_item_id: obj.nix_item_id,
//                             photo: obj.photo.thumb
//                         }
//                     })
//                     console.log('filteredList' , JSON.stringify(filteredList , null, 2));
//                     dispatch({
//                         type: LOAD_FOODS,
//                         payload: filteredList
//                     });
//                 },
//                 (err) => {
//                     console.log('err', err);
//                 }
//             )
//     }
// }