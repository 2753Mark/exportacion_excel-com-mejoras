function exportToExcel() {
    const tabla = document.getElementById("tableID");
    if (!tabla) {
      console.error("No se encuentra la tabla!");
      return;
    }
  
    // Clonar la tabla para no modificar la original al exportar
    const tablaClonada = tabla.cloneNode(true);
  
    // Ocultar la columna de acciones en la tabla clonada (si la tienes)
    const columnasAcciones = tablaClonada.querySelectorAll('.acciones'); // Reemplaza 'acciones' con la clase de tu columna
    columnasAcciones.forEach(columna => columna.style.display = 'none');
  
    // Obtener el TEXTO del título (no el elemento HTML)
    const tituloElement = document.getElementById("titulo"); // Obtener el elemento h1
    const tituloTexto = tituloElement ? tituloElement.textContent : "Exportación"; // Obtener el texto, o "data" si no existe
  
    const filename = tituloTexto + ".xls"; // Nombre del archivo usando el título
  
    const dataType = 'application/vnd.ms-excel';
  
    // Convertir la tabla clonada a HTML
    let tableHTML = tablaClonada.outerHTML;
  
    // Agregar estilos CSS a la tabla HTML (importante para el diseño en Excel)
    tableHTML = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
      
        <style>
          body{

font-family: 'Times New Roman', Times, serif;

background-color: azure;
text-decoration: none;


}

table{
 max-width: 500px;
}
th{
    padding: 2px;
    border: 1px;
}
td{
    border: solid 3px;
    padding: auto;
}
        </style>
      </head>
      <body>
        ${tableHTML}
      </body>
      </html>
    `;
  
    const blob = new Blob(['\ufeff', tableHTML], { type: dataType });
  
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      link.href = 'data:' + dataType + ', ' + encodeURIComponent(tableHTML);
      link.style.display = 'none';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }