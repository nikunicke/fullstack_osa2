import React from 'react';


const AddContact = ({ onSubmit, contacts, eventHandler }) => {
    return (
      <div>
        <h2>Add Contact</h2>
        <form onSubmit={onSubmit}>
          <div>
            Name: <input name="name" value={contacts.name} onChange={eventHandler} />
          </div>
          <div>
            Number: <input name="number" value={contacts.number} onChange={eventHandler} />
          </div>
          <div>
            <button type="submit">Add Contact</button>
          </div>
        </form>
      </div>
    )
  }

export default AddContact