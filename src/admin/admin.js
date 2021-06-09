import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import "../styles.css";

function Admin() {
  const[products,setProducts]= useState([{
    name:'',
    image:'',
  id:'',
  price:'',
  description:''

  }])

  const[product,setProduct]= useState([{
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
  })
 function handelChange(e){
   const{name,value}= e.target;
   setProduct(prevalue =>{
     return({
       ...prevalue,
       [name]:value
     })



   })
   console.log(product);

 }
 function addProduct(e){
   e.preventDefault();
   console.log("clicked")
   const newProduct={
     id:product.id,
    name:product.name,
     image:product.image,
     price:product.price,
     description:product.description
   }
   console.log(newProduct);


   axios.post('/products', newProduct)

 }
  function deleteProduct(name){
    axios.delete('/products/' + name);

  }
  return (
    <div className="admin">
      <h1>Add movie</h1>
      <form>
        <input type ="text" onChange={handelChange} value ={product.id} name = "id" placeholder="id"/>
        <input type ="text"  onChange={handelChange} value ={product.name}  name = "name" placeholder="name"/>
        <input type ="text" onChange={handelChange} value ={product.image}  name = "image" placeholder="image"/>
        <input type ="text" onChange={handelChange} value ={product.price}  name = "price" placeholder="price"/>
        <input type ="text" onChange={handelChange} value ={product.description}  name = "description" placeholder="desc"/>
        <button onClick={addProduct}>Add movie</button>
      </form>
      {products.map(product =>{
        return (
          <div className="conatiner">
            <p>{product.id}</p>
            <h1>{product.name}</h1>
            <img  src={product.image} alt=""></img>
            <p> {product.price}</p>
            <p>{product.description}</p>
            <button onClick={()=> deleteProduct(product.name)}>Delete</button>
            </div>


        );
      })}

    </div>
  );
}

export default Admin;
