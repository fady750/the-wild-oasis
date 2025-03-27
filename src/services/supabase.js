import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://kgkedefrmglquitmmuhp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtna2VkZWZybWdscXVpdG1tdWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDkzNjAsImV4cCI6MjA1NzcyNTM2MH0.HxK7M5XwFuAy39m63UJTqUHSt_2u6xUfFZBpq1huS2U"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;