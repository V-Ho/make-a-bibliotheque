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
  renderTable()
}

const hideBtn = () => {
  document.getElementById('addBookBtn').style.display = 'none'
}


// store book data in localStorage
let booksArray
const populateStorage = () => {
  // setItem stores key with values in localStorage
  localStorage.setItem('booksArray', JSON.stringify(myLibrary)) 

  // if localStorage exists, store as booksArray otherwise store as array
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