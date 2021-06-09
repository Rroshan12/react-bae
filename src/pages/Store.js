import React ,{useState,useEffect} from 'react';
import Product from "../components/Product";



export default function Store() {

  const[products,setProducts]= useState([{
    name:'',
    image:'',
  id:'',
  price:'',
  description:''

  }])

  useEffect(()=>{
    fetch('/products').then(res=>{
      if(res.ok){
        return res.json()
      }
    }).then(jsonRes => setProducts(jsonRes))
  }) // eslint-disable-next-line 
  return (
    <main>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </main>
  );
}
