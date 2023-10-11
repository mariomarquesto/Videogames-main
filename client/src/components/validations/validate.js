export default function validation(input) {
    const errors = {}
    
    if(input.nombre && !/^[a-zA-Z\s]+$/.test(input.nombre) ) errors.nombre  = "No se puede ingresar simbolos."

    if(input.nombre.length > 30 ) errors.nombre = 'El nombre ingresado debe tener menos de 30 caracteres.'

    if(input.fecha_lanzamiento && !/^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{2}$/.test(input.fecha_lanzamiento) ) errors.fecha_lanzamiento = "El formato debe ser: 01/01/23"

    if(!/^[0-5](\.\d{1,2})?$/.test(input.rating )) errors.rating = "Ingresar un puntaje de 0 a 5 puntos"

    if(input.imagen && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.imagen) ) errors.imagen = "Ingersa una URL valida"

    if(input.descripcion.length > 255 ) errors.descripcion = "Maximo: 255 caracteres."

    return errors
} 