let btn_compra = document.querySelectorAll(".botonCompra");
console.log(btn_compra);

// recorro la coleccion uno por uno los elementos
for (let boton of btn_compra){

    boton.addEventListener("click" , agregar_a_carrito)


}



function agregar_a_carrito(e){
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    console.log("EL EVENTO ESTA EN:" , e.target.id);

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombre_producto = padre.querySelector("h5").textContent;

    let precio = padre.querySelector("span").textContent;

    let img = abuelo.querySelector("img").src;

    let producto = {
        nombre: nombre_producto,
        img: img,
        precio: precio,
        cantidad:1
    };

    carrito.push (producto);

    let arreglo_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", arreglo_JSON);

    console.log(carrito);

    mostrar_carrito( producto);

    


}

function mostrar_carrito( producto){


    let fila = document.createElement("tr");

    fila.innerHTML = `<td><img src="${producto.img}"></td>
                      <td>${producto.nombre}</td>
                      <td>${producto.cantidad}</td>
                      <td>${producto.precio}</td>
                      <td><button class="btn-danger borrar_elemento">Borrar</button></td>`;

    
    let tabla = document.getElementById("tbody");

    tabla.append(fila);


    let botones_borrar = document.querySelectorAll(".borrar_elemento");

    for( let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    }


}

function borrar_producto(e){

    let abuelo = e.target.parentNode.parentNode;
    abuelo.remove();
    
}

const pintarFooter = () => {
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    
    
    if (carrito.length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = carrito.reduce((acc , prod ) => acc + prod.cantidad, 0)
    const nPrecio = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio ,0)
    // console.log(nPrecio)

    // templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    // templateFooter.querySelector('span').textContent = nPrecio
    console.log (nCantidad , nPrecio)

    
    
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
    
        pintarCarrito()
    })

}