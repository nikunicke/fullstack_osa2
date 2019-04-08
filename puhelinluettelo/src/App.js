import React, { useState, useEffect } from 'react';
import AddContact from './components/AddContact';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Notification from './components/Notification';
import contactService from './services/contacts';


const App = (props) => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState({
    name: '',
    number: '',
  })
  const [ showAll, setShowAll ] = useState('')
  const [ notification, setNotification ] = useState({
    message: null,
    status: null
  })

  const errorMessage = {
    message: `Contact has already been deleted form the server`,
    status: "error"
  }

  const setMessage = (message, status) => {
    setNotification({
      ...notification,
      message: message,
      status: status
    })
  }


  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => setPersons(contacts))
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName.name,
      number: newName.number
    }
    
    // Here we are generating an array with boolean values. If newName equals an existing name. The value
    // will become true. After the array is returned we check if it contains any true values.
    if (persons.map(person => person.name.toLowerCase() === newName.name.toLowerCase()).includes(true)) {
      if (window.confirm(`${nameObject.name} already in list. Would you like to update number to ${nameObject.number}`)) {

        const name = persons.find(person => person.name === nameObject.name)
        const changedContact = {...name, number: nameObject.number}

        contactService
          .update(name.id, changedContact)
          .then(returnedContact => {
            setPersons(persons.map(person => person.id !== name.id ? person : returnedContact))
          })
          .then(() => {
            setMessage(`${nameObject.name} updated`, 'success')
            setTimeout(() => {
              setMessage(null, null)
            }, 5000)
          })
          .catch(err => {
            setMessage(err.response.data.error, 'error')
            if (err.response.status === 500) {
              setPersons(persons.filter(person => person.id !== name.id))
            }
            setTimeout(() => {
              setMessage(null, null)
            }, 5000)
          })
      }
    } else {
      contactService
        .create(nameObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
        })
        .then(() => {
          setMessage(`${nameObject.name} added`, 'success')
          setTimeout(() => {
            setMessage(null, null)
          }, 5000)
        })
        .catch(err => {
          console.log(err.response.data.error)
          setMessage(err.response.data.error, 'error')
          setTimeout(() => {
            setMessage(null, null)
          }, 5000)
        })
      }
    setNewName({...newName, name: '', number: ''})
  }

  const handleNameChange = (event) => {
    setNewName({...newName, [event.target.name]: event.target.value})
  }
  const handleFilterChange = (event) => {
    setShowAll(event.target.value)
  }
  const handleRemoveChange = (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      const deleteThis = persons.find(person => person.id === contact.id)
      contactService
        .remove(deleteThis.id)
        .then(removeContact => {
          setPersons(persons.filter(person => person.id !== deleteThis.id))
        })
        .then(() => {
          setMessage(`${contact.name} deleted`, 'success')
          setTimeout(() => {
            setMessage(null, null)
          }, 5000)
        })
        .catch(err => {
          setMessage(errorMessage.message, errorMessage.status)
          setPersons(persons.filter(person => person.id !== deleteThis.id))
          setTimeout(() => {
            setMessage(null, null)
          }, 5000)
        })
    }
  }


  return (
    <div>
      <h2 className="spacing-bottom">Phonebook</h2>
      <Notification message={notification} />
      <Filter name='filter' value={showAll} eventHandler={handleFilterChange} /> 
      <AddContact onSubmit={addName} contacts={newName} eventHandler={handleNameChange} />
      <h2>Contacts</h2>
      <Contacts contacts={persons} filter={showAll} eventHandler={handleRemoveChange}/>
    </div>
  )
}

export default App;
