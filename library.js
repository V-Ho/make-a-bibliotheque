/* Write a constructor for making “book” objects. We will revisit this in the project at the end of this lesson. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book */

let myLibrary = [
  {
    title: 'Blindness',
    author: 'José Saramago',
    read: true
  },
  {
    title: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    read: true
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    read: true
  }
]

class Book {
  constructor (title, author, read) {
    this.title = title
    this.author = author
    this.read = read
  }
}

const showForm = () => {
  document.getElementById('form').style.display = 'block'
  hideBtn()
}

const submitBook = () => {
  addBookfromForm()
  document.getElementById('form').reset()

  // show only one updated table
  const existingTable = document.getElementsByTagName('table')[0]
  existingTable.remove()
  renderTable()
}

const hideBtn = () => {
  document.getElementById('showFormBtn').style.display = 'none'
}

// store book data in localStorage
let booksArray
const populateStorage = () => {
  localStorage.setItem('booksArray', JSON.stringify(myLibrary)) 
  booksArray = JSON.parse(localStorage.getItem('booksArray' || '[]'))
}

populateStorage()

const addBookfromForm = () => {
  const newBook = new Book(
    document.getElementById('bookTitle').value,
    document.getElementById('bookAuthor').value,
    document.getElementById('bookRead').value
  )

  // update localStorage with new book entry
  localStorage.setItem('newBook', JSON.stringify(newBook))
  booksArray.push(newBook)
}

const renderTable = () => {
  const tbl = document.createElement('table')
  const tblBody = document.createElement('tbody')
  const body = document.getElementsByTagName('body')[0]
  const theader = document.createElement('thead')

  // create header row
  let headerCol = []
  for (let i = 0; i < 3; i++) {
    for (let key in myLibrary[i]) {
      if (headerCol.indexOf(key) === -1) {
        headerCol.push(key)
      }
    }
  }

  const hRow = document.createElement('tr')
  for (let i = 0; i < headerCol.length; i++) {
    const th = document.createElement('th')
    th.innerHTML = headerCol[i]
    hRow.appendChild(th)
  }
  theader.appendChild(hRow)

  // create rows
  let currentRow
  for (let i = 0; i < booksArray.length; i++) {
    const row = document.createElement('tr')

    // create cells
    currentRow = booksArray[i]
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement('td')
      cell.setAttribute('class', `cell${j}`)

      const cellBookTitle = document.createTextNode(currentRow.title)
      const cellBookAuthor = document.createTextNode(currentRow.author)
      const cellBookRead = document.createTextNode(currentRow.read)

      if (cell.className === 'cell0') {
        cell.appendChild(cellBookTitle)
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
  tbl.appendChild(theader)
  tbl.appendChild(tblBody)
  body.appendChild(tbl)
}

window.onload = renderTable()