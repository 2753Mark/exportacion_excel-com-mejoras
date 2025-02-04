//©Copyright 2025 2753MARK


function exportToExcel() {
    var table = document.getElementById("tableID");
    if (!table) {
        console.error("No se encuentra la tabla!");
        return;
    }

    // Obtener el TEXTO del título (no el elemento HTML)
    var tituloElement = document.getElementById("titulo"); // Obtener el elemento h1
    var tituloTexto = tituloElement ? tituloElement.textContent : "Exportación"; // Obtener el texto, o "data" si no existe

    var filename = tituloTexto + ".xls"; // Nombre del archivo usando el título

    var dataType = 'application/vnd.ms-excel';

    // Generar el HTML de la tabla (importante!)
    var tableHTML = table.outerHTML;

    // Crear el Blob con el BOM para la codificación correcta
    var blob = new Blob(['\ufeff', tableHTML], { type: dataType });

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var link = document.createElement('a');
        link.href = 'data:' + dataType + ', ' + encodeURIComponent(tableHTML); // Usar encodeURIComponent
        link.style.display = 'none';
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}