import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdmin() {
  console.log('Creating default admin user...')
  
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@msadvocate.net',
    password: 'AdminPassword123!',
    email_confirm: true,
    user_metadata: { 
      role: 'admin',
      first_name: 'Main',
      last_name: 'Admin'
    }
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('Admin already exists. Updating role to admin just in case...')
      // If user exists, we'll try to find them and update meta
      const { data: users } = await supabase.auth.admin.listUsers()
      const adminUser = users.users.find(u => u.email === 'admin@msadvocate.net')
      if (adminUser) {
        await supabase.auth.admin.updateUserById(adminUser.id, {
          user_metadata: { role: 'admin', first_name: 'Main', last_name: 'Admin' }
        })
        console.log('Admin role updated successfully.')
      }
    } else {
      console.error('Error creating admin:', error.message)
    }
  } else {
    console.log('Default admin created successfully!')
    console.log('Email: admin@msadvocate.net')
    console.log('Password: AdminPassword123!')
  }
}

createAdmin()
