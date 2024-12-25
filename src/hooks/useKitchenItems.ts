import { useState, useEffect } from 'react';
import { kitchenApi } from '../services/api';
import type { KitchenItem } from '../types/kitchen';

export function useKitchenItems() {
  const [items, setItems] = useState<KitchenItem[]>([]);
  const [editingItem, setEditingItem] = useState<KitchenItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setError(null);
      const data = await kitchenApi.getAllItems();
      setItems(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(message);
      console.error('Failed to load items:', error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (newItem: Omit<KitchenItem, 'id'>) => {
    try {
      setError(null);
      await kitchenApi.createItem(newItem);
      loadItems();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create item';
      setError(message);
      console.error('Failed to create item:', error);
    }
  };

  const handleUpdate = async (updatedItem: Omit<KitchenItem, 'id'>) => {
    if (!editingItem) return;
    try {
      setError(null);
      await kitchenApi.updateItem(editingItem.id, updatedItem);
      setEditingItem(null);
      loadItems();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update item';
      setError(message);
      console.error('Failed to update item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      setError(null);
      await kitchenApi.deleteItem(id);
      loadItems();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete item';
      setError(message);
      console.error('Failed to delete item:', error);
    }
  };

  return {
    items,
    error,
    editingItem,
    handleCreate,
    handleUpdate,
    handleDelete,
    setEditingItem
  };
}