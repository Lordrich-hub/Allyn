'use server'

import { createServerClient } from '@/lib/supabase'
import { type Message, type Conversation } from '@afroluxe/lib'

export async function getConversations(userId: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('conversations')
      .select(
        `
        id,
        customer_id,
        vendor_id,
        last_message,
        last_message_at,
        created_at,
        vendors (
          name,
          image_url
        ),
        profiles (
          name,
          avatar_url
        )
      `
      )
      .or(`customer_id.eq.${userId},vendor_id.eq.${userId}`)
      .order('last_message_at', { ascending: false })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An error occurred' }
  }
}

export async function getMessages(conversationId: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An error occurred' }
  }
}

export async function sendMessage(input: {
  conversationId: string
  senderId: string
  content: string
}) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: input.conversationId,
        sender_id: input.senderId,
        content: input.content,
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

export async function createConversation(input: {
  customerId: string
  vendorId: string
}) {
  try {
    const supabase = createServerClient()

    // Check if conversation already exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('customer_id', input.customerId)
      .eq('vendor_id', input.vendorId)
      .single()

    if (existing) {
      return { data: existing, error: null }
    }

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        customer_id: input.customerId,
        vendor_id: input.vendorId,
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
