import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';
//crear el context
export const CategoriasContext = createContext();

const CategoriasProvider=(props)=>{

     // podes crear stats entre otras cosas 
     const [categorias,guardarCategoria]=useState([]);
  //llamado a la api
  useEffect(()=>{
const consultarApi=async()=>{
const url='https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const resultado=await axios.get(url);
guardarCategoria(resultado.data.drinks);

}
consultarApi();
  },[]);
    return(
        <CategoriasContext.Provider
        value={{
            //aca van todoslo valores que seran disponibles 
            //en los demas componentes
            categorias
        }}
        >

            {props.children}
        </CategoriasContext.Provider>
    )

}
export default CategoriasProvider;