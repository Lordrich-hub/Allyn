'use server'

import { createServerClient } from '@/lib/supabase'

export async function getFavorites(userId: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('favorites')
      .select(
        `
        id,
        vendor_id,
        vendors (
          id,
          name,
          category,
          image_url
        )
      `
      )
      .eq('user_id', userId)

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An error occurred' }
  }
}

export async function addFavorite(userId: string, vendorId: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        vendor_id: vendorId,
      })
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An error occurred' }
  }
}

export async function removeFavorite(userId: string, vendorId: string) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('vendor_id', vendorId)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'An error occurred' }
  }
}

export async function submitReview(input: {
  bookingId: string
  vendorId: string
  rating: number
  comment: string
}) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Not authenticated' }
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        booking_id: input.bookingId,
        vendor_id: input.vendorId,
        user_id: user.id,
        rating: input.rating,
        comment: input.comment,
      })
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An error occurred' }
  }
}
