'use server'

import { createServerClient } from '@/lib/supabase'
import { type Vendor, type Service, type Booking } from '@afroluxe/lib'

export async function getVendors(category?: string, location?: string) {
  try {
    const supabase = createServerClient()

    let query = supabase
      .from('vendors')
      .select(
        `
        id,
        user_id,
        name,
        category,
        bio,
        image_url,
        verified,
        created_at,
        reviews (
          id,
          rating
        )
      `
      )

    if (category) {
      query = query.eq('category', category)
    }

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }

    const { data, error } = await query.limit(50)

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An error occurred' }
  }
}

export async function getVendorById(vendorId: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('vendors')
      .select(
        `
        *,
        services (
          id,
          name,
          description,
          price,
          duration_minutes
        ),
        reviews (
          id,
          rating,
          comment,
          created_at,
          profiles (
            name
          )
        )
      `
      )
      .eq('id', vendorId)
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

export async function getServices(vendorId: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('vendor_id', vendorId)

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An error occurred' }
  }
}

export async function createBooking(input: {
  vendorId: string
  serviceId: string
  date: string
  time: string
  notes?: string
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
      .from('bookings')
      .insert({
        customer_id: user.id,
        vendor_id: input.vendorId,
        service_id: input.serviceId,
        booking_date: input.date,
        booking_time: input.time,
        notes: input.notes,
        status: 'pending',
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

export async function getBookings(userId: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('bookings')
      .select(
        `
        *,
        vendors (
          name,
          category
        ),
        services (
          name,
          price
        )
      `
      )
      .or(`customer_id.eq.${userId},vendor_id.eq.${userId}`)
      .order('booking_date', { ascending: true })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An error occurred' }
  }
}
