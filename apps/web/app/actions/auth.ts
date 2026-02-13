'use server'

import { createServerClient } from '@/lib/supabase'
import { signUpSchema, signInSchema, type SignUpInput, type SignInInput } from '@afroluxe/lib'
import { redirect } from 'next/navigation'

export async function signUp(input: SignUpInput) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { error: 'Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' }
    }

    const parsed = signUpSchema.parse(input)
    const supabase = createServerClient()

    const { data, error } = await supabase.auth.signUp({
      email: parsed.email,
      password: parsed.password,
      options: {
        data: {
          name: parsed.name,
          role: parsed.role,
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    // Create user profile
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        name: parsed.name,
        email: parsed.email,
        role: parsed.role,
      })
    }

    return { success: true, user: data.user }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'An error occurred' }
  }
}

export async function signIn(input: SignInInput) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { error: 'Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' }
    }

    const parsed = signInSchema.parse(input)
    const supabase = createServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.email,
      password: parsed.password,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true, user: data.user }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'An error occurred' }
  }
}

export async function signOut() {
  const supabase = createServerClient()
  await supabase.auth.signOut()
  redirect('/become-vendor')
}
