import React from 'react';
import { Package } from 'lucide-react';
import { KitchenItemForm } from './components/KitchenItemForm';
import { KitchenItemList } from './components/KitchenItemList';
import { useKitchenItems } from './hooks/useKitchenItems';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const {
    items,
    error,
    editingItem,
    handleCreate,
    handleUpdate,
    handleDelete,
    setEditingItem
  } = useKitchenItems();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Kitchen Storage Manager</h1>
            </div>
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="mb-8">
            <KitchenItemForm
              item={editingItem || undefined}
              onSubmit={editingItem ? handleUpdate : handleCreate}
              isEditing={!!editingItem}
            />
          </div>

          <div className="bg-white shadow rounded-lg">
            <KitchenItemList
              items={items}
              onEdit={setEditingItem}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;