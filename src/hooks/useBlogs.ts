import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Blog {
  id: string;
  title: string;
  content: string;
  author_name: string;
  publish_date: string | null;
  publish_time: string | null;
  tags: string[];
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('publish_date', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setBlogs(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const getBlogById = async (id: string): Promise<Blog | null> => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      return data;
    } catch (err) {
      console.error('Error fetching blog by ID:', err);
      return null;
    }
  };

  const getRandomBlogs = async (excludeId?: string, limit: number = 3): Promise<Blog[]> => {
    try {
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('published', true);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error: supabaseError } = await query.limit(limit * 2); // Get more to randomize

      if (supabaseError) {
        throw supabaseError;
      }

      // Randomize and limit the results
      const shuffled = (data || []).sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    } catch (err) {
      console.error('Error fetching random blogs:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
    getBlogById,
    getRandomBlogs,
  };
};