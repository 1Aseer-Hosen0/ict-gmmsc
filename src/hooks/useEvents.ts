import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface Event {
  id: string
  title: string
  description: string | null
  category: string
  event_date: string
  event_time: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) {
        setError(error.message)
        return
      }

      setEvents(data || [])
    } catch (err) {
      setError('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  return { events, loading, error, refetch: fetchEvents }
}

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    fetchEvent(id)
  }, [id])

  const fetchEvent = async (eventId: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single()

      if (error) {
        setError(error.message)
        return
      }

      setEvent(data)
    } catch (err) {
      setError('Failed to fetch event')
    } finally {
      setLoading(false)
    }
  }

  return { event, loading, error }
}

export const useOtherEvents = (currentEventId: string, limit = 3) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!currentEventId) return

    fetchOtherEvents()
  }, [currentEventId])

  const fetchOtherEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .neq('id', currentEventId)
        .limit(limit)

      if (error) {
        setError(error.message)
        return
      }

      // Shuffle the results to show random events
      const shuffled = data?.sort(() => 0.5 - Math.random()) || []
      setEvents(shuffled)
    } catch (err) {
      setError('Failed to fetch other events')
    } finally {
      setLoading(false)
    }
  }

  return { events, loading, error }
}