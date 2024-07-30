import React from 'react';
import Cart from './Cart';
import ProductDetails from './ProductDetails';
const Formulario = () => {
    const { register, formState: { errors }, watch, handleSubmit } = useForm({

    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return <div className="box-form">
        <span className="datos-de-compra">Datos de la compra</span>
        {/* {<p className="nombre">Nombre: {watch('Nombre')}</p>} */}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="nombres">
                
                <label className="requerimentos">Nombre</label><div>

                <input className="datos" type="text" {...register('Nombre', {
                    required: true,
                    maxLength: 20
                })} />
                {errors.Nombre?.type === 'required' && <p className="requerimento">El campo nombre es requerido</p>}
                {errors.Nombre?.type === 'maxLength' && <p className="requerimento">El campo nombre debe tener menos de 20 caracteres</p>}
            </div>
            <div><label className="requerimentos">Apellido</label><div>

                <input className="datos" type="text" {...register('Apellido', {
                    required: true,
                    maxLength: 20
                })} />
                {errors.Apellido?.type === 'required' && <p className="requerimento">El campo apellido es requerido</p>}
                {errors.Apellido?.type === 'maxLength' && <p className="requerimento">El campo apellido debe tener menos de 20 caracteres</p>}
            </div>
            </div>
            </div>

                <div className="correo">
                <label className="requerimentos">Email</label>
                <div>

                <input className="datos" type="text" {...register('email',{
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                }
                )} />
                {errors.email?.type === 'required' && <p className="requerimento">El campo email es requerido</p>}
                {errors.email?.type === 'pattern' && <p className="requerimento">El formato del email es incorrecto</p>}
            </div>
            </div>
            <div className="celular">
            <label className="requerimentos">Celular</label>
                <div>
                    <input className="datos" type="text" {...register('Celular', {
                    required: true,
                    maxLength: 20
                })} />
                {errors.Celular?.type === 'required' && <p className="requerimento">El campo celular es requerido</p>}
                {errors.Celular?.type === 'maxLength' && <p className="requerimento">El campo celular debe tener menos de 20 caracteres</p>}
                </div>
            </div>
                    <div className="cedula">
            <label className="requerimentos">Cedula</label>
            <div>

                    <input className="datos" type="text" {...register('Cedula', {
                    required: true,
                    maxLength: 20
                })} />
                {errors.Cedula?.type === 'required' && <p className="requerimento">El campo cedula es requerido</p>}
                {errors.Cedula?.type === 'maxLength' && <p className="requerimento">El campo Cedula debe tener menos de 20 caracteres</p>}
            </div>


                </div>
            
            <input className="enviar-datos" type="submit" value="Enviar datos" />
        </form>
    </div>
}
const Modal = ({ isOpen, closeModal }) => {
    if (!isOpen) return null; 

    return (
    <div>
        <button className="button-modal close-modal" size={30} color="#000" onClick={closeModal} style={{ cursor: 'pointer' }}>
        Cerrar modal
        </button>
        <div className="form">
    <Formulario />
    <ProductDetails/>
    <Cart/>

        </div>
</div>
    );
};

export default Modal;