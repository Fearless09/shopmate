// api.js

export const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  
export let test = [
  {
  category: "men's clothing",
  description:  "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  price: 109.95,
  priceID: "price_1NCMcaBtyNrF383HitQ0JASG",
  rating: {
    rate: 3.9,
    count: 120
  },
  count: 120,
  rate: 3.9,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
  }
]