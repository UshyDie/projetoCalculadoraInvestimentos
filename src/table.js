const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray || !tableId)
  ) {
    throw new Error(
      'Para a execução correta é necessário o preenchimento com o array para as colunas, outro para as informações das linhas e o Id da tabela.'
    );
  }

  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== 'TABLE') {
    throw new Error('Id informado não corresponde a nenhum elemento table');
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  const createTheadElement = (tableReference) => {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead);
    return thead;
  };
  const tableHeaderReference =
    tableReference.querySelector('thead') ?? createTheadElement(tableReference);

  const headerRow = document.createElement('tr');
  ['bg-blue-900', 'text-slate-200', 'sticky', 'top-0'].forEach((cssClass) =>
    headerRow.classList.add(cssClass)
  );
  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/ `<th class="text-center">${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}
function createTableBody(tableReference, tableItems, columnsArray) {
  const createTbodyElement = (tableReference) => {
    const tbody = document.createElement('tbody');
    tableReference.appendChild(tbody);
    return tbody;
  };
  const tableBodyReference =
    tableReference.querySelector('tbody') ?? createTbodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement('tr');

    if (itemIndex % 2 !== 0) {
      tableRow.classList.add('bg-blue-200');
    }

    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html */ `<td class="text-center">${formatFn(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }

    tableBodyReference.appendChild(tableRow);
  }
}
