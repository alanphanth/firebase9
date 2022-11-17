// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBrvQDxhOm2YFo9R2f50GB3nb1oIAyKPzU',
  authDomain: 'fir-9-20af2.firebaseapp.com',
  projectId: 'fir-9-20af2',
  storageBucket: 'fir-9-20af2.appspot.com',
  messagingSenderId: '75430517222',
  appId: '1:75430517222:web:32972a62f080c3212fde27',
}

// Initialize Firebase
initializeApp(firebaseConfig)

// Initialize services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs)
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch((err) => {
    console.log(err.message)
  })

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset()
  })
})
