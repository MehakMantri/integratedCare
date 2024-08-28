import React, { useState, useEffect } from 'react';
import { useTheme } from '../HomePage/ThemeContext';
import { FaPlus, FaMinus, FaExclamationTriangle, FaShoppingCart, FaHistory } from 'react-icons/fa';

function InventoryManagement() {
  const { isDarkTheme } = useTheme();
  const [categories, setCategories] = useState(['Medication', 'Medical Supplies', 'Equipment']);
  const [selectedCategory, setSelectedCategory] = useState('Medication');
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Paracetamol', category: 'Medication', quantity: 1000, unit: 'tablets', minStock: 500, expiryDate: '2024-12-31' },
    { id: 2, name: 'Ibuprofen', category: 'Medication', quantity: 750, unit: 'tablets', minStock: 300, expiryDate: '2024-10-31' },
    { id: 3, name: 'Surgical Masks', category: 'Medical Supplies', quantity: 5000, unit: 'pieces', minStock: 1000, expiryDate: null },
    { id: 4, name: 'Disposable Gloves', category: 'Medical Supplies', quantity: 10000, unit: 'pairs', minStock: 2000, expiryDate: null },
    { id: 5, name: 'Ventilator', category: 'Equipment', quantity: 10, unit: 'units', minStock: 2, expiryDate: null },
    { id: 6, name: 'Defibrillator', category: 'Equipment', quantity: 5, unit: 'units', minStock: 1, expiryDate: null },
  ]);
  const [newItem, setNewItem] = useState({ name: '', category: 'Medication', quantity: '', unit: '', minStock: '', expiryDate: '' });
  const [orders, setOrders] = useState([]);
  const [usageHistory, setUsageHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(checkLowStock, 3600000); // Check low stock every hour
    return () => clearInterval(interval);
  }, []);

  const checkLowStock = () => {
    const lowStockItems = inventory.filter(item => item.quantity <= item.minStock);
    if (lowStockItems.length > 0) {
      alert(`Low stock alert for: ${lowStockItems.map(item => item.name).join(', ')}`);
    }
  };

  const addNewItem = () => {
    if (newItem.name && newItem.quantity && newItem.unit && newItem.minStock) {
      setInventory([...inventory, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', category: 'Medication', quantity: '', unit: '', minStock: '', expiryDate: '' });
    }
  };

  const updateQuantity = (id, amount) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + amount);
        setUsageHistory([...usageHistory, {
          id: Date.now(),
          itemId: id,
          itemName: item.name,
          change: amount,
          newQuantity: newQuantity,
          date: new Date().toISOString()
        }]);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const placeOrder = (item) => {
    const orderQuantity = item.minStock * 2 - item.quantity;
    setOrders([...orders, {
      id: Date.now(),
      itemId: item.id,
      itemName: item.name,
      quantity: orderQuantity,
      status: 'Pending',
      date: new Date().toISOString()
    }]);
  };

  const getStatusColor = (quantity, minStock) => {
    if (quantity <= minStock / 2) return 'bg-red-200 text-red-800';
    if (quantity <= minStock) return 'bg-yellow-200 text-yellow-800';
    return 'bg-green-200 text-green-800';
  };

  return (
    <div className={`p-6 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>Inventory Management</h2>
      
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item Name"
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        />
        <input
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
          placeholder="Quantity"
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        />
        <input
          type="text"
          value={newItem.unit}
          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
          placeholder="Unit (e.g., tablets, pieces)"
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        />
        <input
          type="number"
          value={newItem.minStock}
          onChange={(e) => setNewItem({ ...newItem, minStock: parseInt(e.target.value) })}
          placeholder="Minimum Stock Level"
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        />
        <input
          type="date"
          value={newItem.expiryDate}
          onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
          placeholder="Expiry Date (if applicable)"
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        />
        <button
          onClick={addNewItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Item
        </button>
      </div>

      <div className={`mb-6 ${isDarkTheme ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded shadow`}>
        <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'} mb-2`}>Current Inventory</h3>
        <table className="w-full">
          <thead>
            <tr className={isDarkTheme ? 'bg-gray-600' : 'bg-blue-100'}>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Min Stock</th>
              <th className="p-2 text-left">Expiry Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.filter(item => item.category === selectedCategory).map(item => (
              <tr key={item.id} className={isDarkTheme ? 'border-b border-gray-600' : 'border-b'}>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.category}</td>
                <td className={`p-2 ${getStatusColor(item.quantity, item.minStock)}`}>
                  {item.quantity} {item.unit}
                </td>
                <td className="p-2">{item.minStock} {item.unit}</td>
                <td className="p-2">{item.expiryDate || 'N/A'}</td>
                <td className="p-2">
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="mr-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    <FaMinus />
                  </button>
                  {item.quantity <= item.minStock && (
                    <button
                      onClick={() => placeOrder(item)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      title="Place Order"
                    >
                      <FaShoppingCart />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded shadow`}>
          <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'} mb-2`}>Pending Orders</h3>
          <ul>
            {orders.map(order => (
              <li key={order.id} className="mb-2">
                {order.itemName}: {order.quantity} units (Ordered on: {new Date(order.date).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>

        <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded shadow`}>
          <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'} mb-2`}>Recent Usage History</h3>
          <ul>
            {usageHistory.slice(-5).reverse().map(entry => (
              <li key={entry.id} className="mb-2">
                {entry.itemName}: {entry.change > 0 ? '+' : ''}{entry.change} 
                (New total: {entry.newQuantity}) - {new Date(entry.date).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InventoryManagement;
