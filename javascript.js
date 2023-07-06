
var carrito = [];

function agregarCarrito(event) {

  //selecciono el padre mas cercano con la clase producto, para obtener todos los datos del producto
  var producto = event.target.closest(".producto");

  // Obtengo todos los datos del producto con los selectores
  var nombreProducto = producto.querySelector(".nombreProducto").textContent;
  var precioProducto = producto.querySelector(".precioProducto").textContent;
  //convierto el precio en float y saco el signo $
  precioProducto = parseFloat(precioProducto.replace("$", ""));

  var imagenProducto = producto.querySelector(".imgProducto").src;

  // Incremento el span de productos en el carrito
  var contador = document.getElementById("contadorCarrito");
  contador.textContent = parseInt(contador.textContent) + 1;

  //guardo el producto obtenido
  var producto = {
    nombre: nombreProducto,
    precio: precioProducto,
    imagen: imagenProducto
  };
  carrito.push(producto);

  actualizarCarrito();
}

function eliminarProducto(index) {
  // 1. Elimina el producto del carrito utilizando el índice dado por parámetro
  carrito.splice(index, 1);

  // 2. Actualiza el span de productos en el carrito
  var contador = document.getElementById("contadorCarrito");
  var cantidadProductos = parseInt(contador.textContent);

  contador.textContent = cantidadProductos - 1;


  // 3. Actualiza la ventana emergente del carrito con los productos actualizados
  actualizarCarrito();
}
function abrirVentana() {
  var ventanaEmergente = document.getElementById("ventanaEmergente");
  ventanaEmergente.style.display = "block";

}

function cerrarVentana() {
  var botonCerrar = document.getElementById("cerrarVentana")
  botonCerrar.addEventListener("click", function () {
    var ventanaEmergente = document.getElementById("ventanaEmergente");
    ventanaEmergente.style.display = "none";
  });
}


function actualizarCarrito() {
  var productosCarrito = document.getElementById("ventanaEmergente");
  productosCarrito.innerHTML = "<h2 class='tituloCarrito'>PRODUCTOS:</h2><button class='cerrarVentana' id='cerrarVentana' onclick='cerrarVentana()'>X</button>";

  //creo el boton nuevamente con el nuevo titulo del carrito

 /* var botonCerrar = document.createElement("button");
  botonCerrar.textContent = "X";
  botonCerrar.classList.add("cerrarVentana");
  botonCerrar.addEventListener("click", function () {
    var ventanaEmergente = document.getElementById("ventanaEmergente");
    ventanaEmergente.style.display = "none";
  });
*/
  //productosCarrito.appendChild(botonCerrar);


  var total = 0
  for (var i = 0; i < carrito.length; i++) {
    var producto = carrito[i];
    var nombre = producto.nombre;
    var precio = parseFloat(producto.precio);
    var imagen = producto.imagen;

    var productoHTML = document.createElement("div");
    productoHTML.classList.add("productoCarrito");

    var imagenHTML = document.createElement("img");
    imagenHTML.src = imagen;
    imagenHTML.classList.add("imagenCarrito");

    var contenidoHTML = document.createElement("p");
    contenidoHTML.textContent = nombre + " - $" + precio;

    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar producto";
    botonEliminar.classList.add("eliminarProducto");



    // Utilizamos una función de cierre (closure) para capturar el valor del índice
    (function (index) {
      botonEliminar.addEventListener("click", function () {
        eliminarProducto(index);
        productoHTML.remove();
      });
    })(i);

    total += precio;

    productoHTML.appendChild(imagenHTML);
    productoHTML.appendChild(contenidoHTML);
    productoHTML.appendChild(botonEliminar);
    productosCarrito.appendChild(productoHTML); //y todo el producto html agregado se lo agrego al productosCarrito que es la ventana emergente

    

  }

  //Agrego un span con el total del valor del carrito
  var totalHTML = document.createElement("span");
  totalHTML.classList.add("totalCarrito");
  totalHTML.textContent = "Total: $" + total;

  productosCarrito.appendChild(totalHTML);

  if(carrito.length == 0){
    productosCarrito.innerHTML = "<h2 class='tituloCarrito'>No hay productos en el carrito.</h2><button class='cerrarVentana' id='cerrarVentana' onclick='cerrarVentana()'>X</button>"
  }

  if (carrito.length > 0) {
    var botonComprar = document.createElement("button");
    botonComprar.textContent = "Comprar";
    botonComprar.classList.add("botonComprar");

    botonComprar.addEventListener("click", function () {
      carrito = [];
      

      var contador = document.getElementById("contadorCarrito");
      contador.textContent = 0;
      actualizarCarrito();

      botonComprar.remove();

      alertCompra();
      
      
      // Eliminar el botón "Comprar" después de hacer la compra
    });

    productosCarrito.appendChild(botonComprar);

  }
}




function validarFormulario() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var telefono = document.getElementById("telefono").value;
  var correo = document.getElementById("correo").value;
  var texto = document.getElementById("textArea").value;

  var validado = true;

  if (nombre === "" || !isNaN(nombre)) {
    document.getElementById("nombre").style.border = "1px solid red";
    validado = false;
  } else {
    document.getElementById("nombre").style.border = "1px solid #ffc0cb";
  }

  if (apellido === "" || !isNaN(apellido)) {
    document.getElementById("apellido").style.border = "1px solid red";
    validado = false;
  } else {
    document.getElementById("apellido").style.border = "1px solid #ffc0cb";
  }

  if (telefono !== "" && isNaN(telefono)) {
    document.getElementById("telefono").style.border = "1px solid red";
    validado = false;
  } else {
    document.getElementById("telefono").style.border = "1px solid #ffc0cb";
  }

  if (correo === "" || !validarFormatoCorreo(correo)) {
    document.getElementById("correo").style.border = "1px solid red";
    validado = false;
  } else {
    document.getElementById("correo").style.border = "1px solid #ffc0cb";
  }

  if (texto === "") {
    document.getElementById("textArea").style.border = "1px solid red";
    validado = false;
  } else {
    document.getElementById("textArea").style.border = "1px solid #ffc0cb";
  }

  if (validado) {
    LimpiarFormulario();
    swal({
    title: 'Muchas gracias por contactarse con nosotros, responderemos a la brevedad!',
    icon: 'success'
  });
  }
}

//funcion que valida el formato de un correo electronico (internet)
function validarFormatoCorreo(correo) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function LimpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("textArea").value = "";
}


function alertCompra(){
  swal({
    title: 'Compra realizada con éxito!',
    icon: 'success'
  })
}