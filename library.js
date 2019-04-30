/* Write a constructor for making “book” objects. We will revisit this in the project at the end of this lesson. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book */

let myLibrary = [
  {
    name: 'Blindness',
    author: 'José Saramago',
    read: true
  },
  {
    name: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    read: true
  },
  {
    name: 'Sapiens',
    author: 'Yuval Noah Harari',
    read: true
  }
]
// const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read')
// console.log(book1.info())

const renderTable = () => {
  const tbl = document.createElement('table')
  const tblBody = document.createElement('tbody')
  const body = document.getElementsByTagName('body')[0]

  // create rows
  let currentRow
  for (let i = 0; i < myLibrary.length; i++) {
    const row = document.createElement('tr')

    // create cells
    currentRow = myLibrary[i]
    for (let j = 0; j < Object.keys(currentRow).length; j++) {
      let cell = document.createElement('td')
      cell.setAttribute('class', `cell${j}`)

      const cellBookName = document.createTextNode(currentRow.name)
      const cellBookAuthor = document.createTextNode(currentRow.author)
      const cellBookRead = document.createTextNode(currentRow.read)

      if (cell.className === 'cell0') {
        cell.appendChild(cellBookName)
      } else if (cell.className === 'cell1') {
        cell.appendChild(cellBookAuthor)
      } else {
        cell.appendChild(cellBookRead)
      }
      // add cells with text to rows
      row.appendChild(cell)
    }

    tblBody.appendChild(row)
  }

  tbl.appendChild(tblBody)
  body.appendChild(tbl)
}

window.onload = renderTable()