import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/excluir.png'
import { use } from 'react'
import api from '../../services/api.js'

function Home() {

  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)

    console.log(users)
  }

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value
    })
    getUsers()
    inputName.current.value = " "
    inputAge.current.value = " "
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName} />
        <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span> </p>
          </div>
          <button onClick={() => deleteUsers(user._id)}>
            <img src={Trash} />
          </button>

        </div>
      ))}


    </div>


  )
}

export default Home
