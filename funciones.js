/* DECLARANDO Y DEFINIENDO*/
//para evitar pegar caracteres especiales y mayusculas
document.getElementById('input').addEventListener('paste', function(event) {
    event.preventDefault();
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedText = clipboardData.getData('text');
    // Reemplazar caracteres no permitidos
    pastedText = pastedText.toLowerCase().replace(/[^a-z\s]/g, '');
    // Insertar el texto limpio en el textarea
    var selectionStart = this.selectionStart;
    var selectionEnd = this.selectionEnd;
    this.value = this.value.substring(0, selectionStart) + pastedText + this.value.substring(selectionEnd);
});

function sanitizeInput(event) {
    var textarea = event.target;
    var sanitizedText = textarea.value.toLowerCase().replace(/ñ/g, 'ny').replace(/[^a-z\s]/g, '');
    textarea.value = sanitizedText;
}

let llavesEncriptado ={
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
}



let indicesLlaves = Object.keys(llavesEncriptado);

function copiar(){
    // Obtener el elemento de salida
    let textoSalida = document.getElementsByClassName("output-text")[0];
    let btnCopy = document.getElementById("btn-copiar");

    if(isNaN(btnCopy)===true){
        btnCopy.classList.remove("btn-2");
        btnCopy.classList.add("btn-copiado");
        btnCopy.innerHTML="Copiado";
    }


 
    // Seleccionar el texto dentro del elemento
    textoSalida.select();
    
    try {
        // Copiar el texto seleccionado al portapapeles utilizando el API del portapapeles
        navigator.clipboard.writeText(textoSalida.value);
        console.log("Texto copiado al portapapeles: "+textoSalida.value);
    } catch (err) {
        console.error('Error al intentar copiar texto: ', err);
    }
    
    // Desseleccionar el texto para no dejarlo resaltado
    window.getSelection().removeAllRanges();
}

function print(texto){
    console.log(texto);
}

function encriptador(){
    /* DECLARANDO Y DEFINIENDO*/

    let textinput = (document.getElementById("input")).value;
    var encriptando="";
    let verificaEncriptado = verificadorEncriptador(textinput);
    let itemSalida = document.getElementsByClassName("item-out");
    let img = document.getElementsByClassName("img-out");
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");


    if(textinput.length>0){//si no esta vacio el input
        if(verificaEncriptado === false){ // si el texto no esta encriptado
        
            for(i=0; i<=textinput.length; i++){
                let addLetra = false;
                for(j=0; j<(indicesLlaves).length; j++){
                    if(textinput[i]==indicesLlaves[j]){
                        encriptando= encriptando + llavesEncriptado[indicesLlaves[j]];
                        addLetra = true;
                    }
                }
                if(addLetra == false){
                    encriptando= encriptando + textinput[i];
                }
            }

            if(p1 && p2 && img !== null){
                img[0].remove();
                p1.remove();
                p2.remove();
    
                var newTextArea = document.createElement("textarea");
                var btnCopiar = document.createElement("button");
    
                newTextArea.className ="output-text";
                newTextArea.readOnly;
                newTextArea.value= encriptando.slice(0,-9);
    
                btnCopiar.className="btn btn-2";
                btnCopiar.id="btn-copiar";
                btnCopiar.innerHTML="Copiar";
     
                itemSalida[0].appendChild(newTextArea);
                itemSalida[0].appendChild(btnCopiar);
                btnCopiar.onclick=copiar;
            }else{
                document.getElementsByClassName("output-text")[0].value=encriptando.slice(0,-9);
                let copy = document.getElementById("btn-copiar");
                copy.classList.remove("btn-copiado");
                copy.classList.add("btn-2");
                copy.innerHTML="Copiar";
                
            }


       }else{ //si el texto esta encriptado
            print("Desencripta el input que escribiste");
        }
    }else{
        print("Ingrese texto al input");
    }

 



}


function desencriptar(){
    let textoDesencriptar = document.getElementById("input").value;
    let verificaEncriptado = verificadorEncriptador(textoDesencriptar);

    if(textoDesencriptar.length>0){//si no esta vacio el input
        if(verificaEncriptado===true){// si esta encriptado

            for(i=0; i<=indicesLlaves.length; i++){
                for(j=0; j<(textoDesencriptar.length/2); j++){
                    textoDesencriptar = textoDesencriptar.replace(llavesEncriptado[indicesLlaves[i]],indicesLlaves[i]);
                }
                
            }
            document.getElementsByClassName("output-text")[0].value = textoDesencriptar;
            
            let copy = document.getElementById("btn-copiar");

            if(copy!==null){
                
                copy.classList.remove("btn-copiado");
                copy.classList.add("btn-2");
                copy.innerHTML="Copiar";
            }else{
                copy.classList.remove("btn-2");
                copy.classList.add("btn-copiado");
                copy.innerHTML="Copiado";
            }


        }else{ // si no esta encriptado
            print("Encripte primero");
        }

    }else{
        print("Ingrese texto al input");
    }

    


}

function verificadorEncriptador (textinput){
    let txtIn = textinput;
    let verificador;

    if(txtIn.length>0){

        for(i=0; i<=indicesLlaves.length; i++){ // valor de llaves encriptada
            for(j=0; j<(txtIn.length/2); j++){ // itera posicion 0...i+ hasta que termine con la primera posicion si hay similitud en toda la frase
                
               verificador = txtIn.includes(llavesEncriptado[indicesLlaves[i]]);
               //print(llavesEncriptado[indicesLlaves[i]]+" +"+verificador);
               if(verificador===true){
                return verificador;
               }
            }
        }

        return verificador;
        
    }
}

