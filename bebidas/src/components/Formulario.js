import React ,{useContext,useState}from 'react';
import {CategoriasContext} from '../context/CategoriasContext';
import {RecetasContext} from '../context/RecetasContext';

const Formulario = () => {

 // extraemoslosdatos del context para utilizarlos
 const {categorias} =useContext(CategoriasContext);

  const {buscarRecetas,guardarConsultar} =useContext(RecetasContext);

    //leer seleccion
    const [busqueda,guardarBusqueda]= useState({
        nombre:'',
        categoria:''
    });
    const [error,guardarError]= useState(false);

    const atualizarState= e=>{
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }
   
    
   
    return ( 
        
        <form
        onSubmit={e=>{
            e.preventDefault();
            buscarRecetas(busqueda);
            guardarConsultar(true);
        }}
        className="col-12">
            
        <fieldset className="text-center">
        <legend>Busca bebidas por Categoría o Ingrediente</legend>
        </fieldset>
        <div className="row mt-4">
            {error ? (<p className="alert alert-danger">Debes completar todos los campos</p>) : null}
            <div className="col-md-4">
                <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={atualizarState}
                placeholder="buscar por ingrediente"
                />
            </div>
            <div className="col-md-4">
                <select
                onChange={atualizarState}
                className="form-control"
                name="categoria">
                <option value="">--- Seleccione Categoria ---</option>
                {
               
                categorias.map(c=>(
                   
                    <option key={c.strCategory} value={c.strCategory}>{c.strCategory}</option>
                ))
                }
                </select>
            </div>
            <div className="col-md-4">
                <input
                className="btn btn-block btn-primary"
                type="submit"
                value="Buscar Bebidas"
                />
            </div>
        </div>

        </form>
     );
}
 
export default Formulario;