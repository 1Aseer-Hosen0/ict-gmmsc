import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  caption: string | null;
  created_at: string;
}

export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setGalleryItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery items');
      console.error('Error fetching gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const getUniqueCategories = () => {
    const categories = galleryItems.map(item => item.category);
    return Array.from(new Set(categories));
  };

  const getCategoryCount = (category: string) => {
    if (category === 'All') return galleryItems.length;
    return galleryItems.filter(item => item.category === category).length;
  };

  const filterByCategory = (category: string) => {
    if (category === 'All') return galleryItems;
    return galleryItems.filter(item => item.category === category);
  };

  return {
    galleryItems,
    loading,
    error,
    refetch: fetchGalleryItems,
    getUniqueCategories,
    getCategoryCount,
    filterByCategory
  };
};