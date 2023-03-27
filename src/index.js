// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, connectFirestoreEmulator, query, getDocs, setDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJRjiKh25qpFin5paEVdWzMXdNW840tQY",
  authDomain: "firestore-1a471.firebaseapp.com",
  projectId: "firestore-1a471",
  storageBucket: "firestore-1a471.appspot.com",
  messagingSenderId: "376403734991",
  appId: "1:376403734991:web:2fa6093771a692329da2ba",
  measurementId: "G-PRJFDZG6FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app)

const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080);

const saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", async () => {
    const fruitsCollectionRef = collection(db, 'fruits')
    try{
        const newfruitsRef    = await addDoc(fruitsCollectionRef, {
        name:"Orange",
        color:"blue",
        size:"Big"
        })
        console.log('Created a new fruits: ${newfruitsRef.id}')
    } catch(error){
        console.log(error)
    }

  })

  const getDataBtn = document.querySelector(".get-data")
  getDataBtn.addEventListener("click", async () => {
    const q = query(collection(db, "fruits"))
    const fruits = await getDocs(q)
    fruits.forEach((fruits) => {
        console.log(fruits.data())
    })
  })

  const changeDataBtn = document.querySelector(".change-data")
  changeDataBtn.addEventListener("click", async () => {

    const q = query(collection(db, "fruits"))
    const fruits = await getDocs(q)
    if (fruits.empty){
        console.log("No data to change yet!")
        return
    }

    await setDoc(doc(db, 'fruits', fruits.docs[0].id),{
    name: "banana",
    color: "yellow",
    size: "short"
    }, {merge: true})
})

const deleteDataBtn = document.querySelector(".delete-data")
deleteDataBtn.addEventListener("click", async () => {
    const q = query(collection(db, "fruits"))
    const fruits = await getDocs(q)
    if (fruits.empty){
        console.log("No data to change yet!")
        return
    }
    await deleteDoc(doc(db, 'fruits', fruits.docs[fruits.docs.length-1].id))
    console.log("Deleted Successfully!")
})

const q = query(collection(db, "fruits"))

const unsubscribe = onSnapshot(q, (querySnapshot) => {
    console.log('-----------------------------------------------------------')
    querySnapshot.forEach((fruit) => {
        console.log(fruit.data())
    })
})

//unsubscribe()