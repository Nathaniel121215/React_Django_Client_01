
import React, { useState, useEffect } from 'react';
import { getItems, addItem, updateItem, deleteItem } from '../axios';

const Crud = () => {
    const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getItems().then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleSubmit = (item) => {
    if (isEditing) {
      updateItem(itemToEdit.id, item).then(() => {
        setIsEditing(false);
        setItemToEdit({});
        getItems().then((response) => {
          setItems(response.data);
        });
      });
    } 

      else {
        addItem(item).then(() => {
          getItems().then((response) => {
            setItems(response.data);
          });
        });
      }
    };

        
    
    const handleEdit = (itemId) => {
      const item = items.find(i => i.id === itemId);
      setItemToEdit(item);
      setIsEditing(true);
    };
    
        const handleDelete = (itemId) => {
        deleteItem(itemId).then(() => {
            getItems().then((response) => {
            setItems(response.data);
            });
        });
        };
    

        
  return (
    <div>
      {isEditing ? (
        <EditItemForm
          item={itemToEdit}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <AddItemForm onSubmit={handleSubmit} />
      )}
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

const AddItemForm = ({ onSubmit }) => {
  const [item, setItem] = useState({ name: '', description: '' });

  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(item);
    setItem({ name: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={item.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={item.description}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};


const EditItemForm = ({ item, onSubmit, onCancel }) => {
  const [editedItem, setEditedItem] = useState({...item});

  const handleChange = (event) => {
    setEditedItem({ ...editedItem, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(editedItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={editedItem.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={editedItem.description}
        onChange={handleChange}
      />
      <button type="submit">UPDATEEEEEEEEEEEEEEEEEEE</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

const ItemList = ({ items, onEdit, onDelete }) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => onEdit(item.id)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };

export default Crud;