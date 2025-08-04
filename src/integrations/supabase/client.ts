import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://shsvliqwbrdbxamohndl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoc3ZsaXF3YnJkYnhhbW9obmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNDk5ODIsImV4cCI6MjA2OTYyNTk4Mn0.Omh8X4TsaMf1FIFSrwnfue0t5qmRY2wk3CnNTxFeXAo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)