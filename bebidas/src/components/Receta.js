import React, { useContext, useState } from 'react';
import {ModalContext} from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 700,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));
   // Muestra y formatea los ingredientes
   const mostrarIngredientes = informacion => {
    let ingredientes = [];
    for(let i = 1; i < 16; i++){
        if( informacion[`strIngredient${i}`] ) {
            ingredientes.push(
                <li> { informacion[`strIngredient${i}`] }  { informacion[`strMeasure${i}`] }</li>
            )
        }
    }

    return ingredientes;
}

const Receta = ({receta}) => {
    //configuracion de modal
    const [modalStyle]=useState(getModalStyle);
    const [open,setOpen]= useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }


    // extraer los valores del context
    const { informacion, guardarIdReceta, guardarReceta } = useContext(ModalContext);


    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                 <h2 className="card-header">{receta.strDrink}</h2>

                 <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} />

                 <div className="card-body">
                     <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={()=>{
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                     >
                         Ver Receta
                     </button>

                   <Modal
                   open={open}
                   onClose={()=>{
                       handleClose();
                       guardarReceta({});
                       guardarIdReceta(null);
                    }}
                   >
                       <div style={modalStyle}
                       className={classes.paper}>
                          <div className="row">
                            <div className="col col-md-6">
                               <h2>{informacion.strDrink}</h2>
                           <img className="img-fluid my-4" src={informacion.strDrinkThumb}/>
                           </div>
                               
                           <div className="col col-md-6">
                           <h3 className="mt-4">Instrucciones</h3>

                          <p>
                             {informacion.strInstructions}
                          </p>
                           

                           <h3>Ingredientes y cantidades</h3>
                             <ul>
                                 {mostrarIngredientes(informacion)}
                             </ul>
                           </div>
                           </div>
                          
                           
                       </div>
                   </Modal>
                     
                 </div>
            </div>
        </div>
     );
}
 
export default Receta;