import React from 'react';

const Contact = ({ name, number, eventHandler }) => {
  return (
    <li>{name}: {number}
    <button onClick={eventHandler}>Delete</button></li>
  )
}
const Contacts = ({ contacts, filter, eventHandler }) => {
  const searchResults = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  const rows = () => searchResults.map(contact => {
    return (
      <Contact key={contact.id} 
               name={contact.name} 
               number={contact.number} 
               eventHandler={() => eventHandler(contact)} />
    )
  })

  if (rows().length === 0) {
    return (
      <div>
        <p>No Results</p>
      </div>
    )
  }
  
  return (
    <div>
      {rows()}
    </div>
  )
}

export default Contacts