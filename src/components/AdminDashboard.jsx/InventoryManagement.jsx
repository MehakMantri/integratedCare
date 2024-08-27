import React, { useState } from 'react';

function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Paracetamol', category: 'Medicine', quantity: 1000 },
    { id: 2, name: 'Bandages', category: 'Consumable', quantity: 500 },
    { id: 3, name: 'Syringes', category: 'Consumable', quantity: 2000 },
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category || !newItem.quantity) return;
    setInventory([...inventory, { ...newItem, id: Date.now(), quantity: parseInt(newItem.quantity) }]);
    setNewItem({ name: '', category: '', quantity: '' });
  };

  const updateQuantity = (id, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < 0) return;
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Item Name"
            className="p-2 border rounded"
            required
          />
          <select
            name="category"
            value={newItem.category}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Medicine">Medicine</option>
            <option value="Consumable">Consumable</option>
          </select>
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Add Item
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Update Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <input
                    type="number"
                    min="0"
                    placeholder="New Quantity"
                    className="p-2 border rounded"
                    onBlur={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryManagement;
