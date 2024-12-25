import React from 'react';
import { PlusCircle, Save } from 'lucide-react';
import type { KitchenItem } from '../types/kitchen';

interface KitchenItemFormProps {
  item?: Partial<KitchenItem>;
  onSubmit: (item: Omit<KitchenItem, 'id'>) => void;
  isEditing?: boolean;
}

export function KitchenItemForm({ item, onSubmit, isEditing }: KitchenItemFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      categoryName: formData.get('categoryName') as string,
      quantity: Number(formData.get('quantity')),
      storedIn: formData.get('storedIn') as string,
      expirationDate: formData.get('expirationDate') as string,
    });
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Item' : 'Add New Item'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={item?.name}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="categoryName"
            defaultValue={item?.categoryName}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            defaultValue={item?.quantity}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stored In</label>
          <input
            type="text"
            name="storedIn"
            defaultValue={item?.storedIn}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            defaultValue={item?.expirationDate}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isEditing ? <Save className="w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
        {isEditing ? 'Save Changes' : 'Add Item'}
      </button>
    </form>
  );
}