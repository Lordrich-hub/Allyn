-- Allyn Marketplace Database Schema for Supabase
-- Created: February 2, 2026

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE (extends Supabase Auth)
-- =====================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- VENDORS TABLE
-- =====================================================
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'hair-beauty',
    'food-catering',
    'photography',
    'entertainment',
    'decorations',
    'health-fitness',
    'home-services',
    'tech-services'
  )),
  location TEXT,
  image_url TEXT,
  cover_image_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  price_range TEXT, -- e.g., "£50-£200"
  base_price DECIMAL(10,2),
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'unavailable')),
  verified BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  stripe_account_id TEXT, -- Stripe Connect account ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- VENDOR SERVICES TABLE (specific services offered)
-- =====================================================
CREATE TABLE public.vendor_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER, -- estimated duration
  image_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BOOKINGS TABLE
-- =====================================================
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.vendor_services(id) ON DELETE SET NULL,
  
  -- Booking details
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2) NOT NULL, -- 30% deposit
  remaining_amount DECIMAL(10,2) NOT NULL, -- 70% remaining
  platform_fee DECIMAL(10,2) NOT NULL, -- 10% of total
  vendor_payout DECIMAL(10,2) NOT NULL, -- 90% of total
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', -- waiting for deposit payment
    'confirmed', -- deposit paid, booking confirmed
    'in_progress', -- service ongoing
    'completed', -- service completed, awaiting final payment
    'paid', -- fully paid
    'cancelled', -- cancelled by user or vendor
    'refunded' -- refund processed
  )),
  
  -- Payment tracking
  deposit_paid BOOLEAN DEFAULT FALSE,
  deposit_paid_at TIMESTAMPTZ,
  full_payment_paid BOOLEAN DEFAULT FALSE,
  full_payment_paid_at TIMESTAMPTZ,
  
  -- Additional info
  notes TEXT,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PAYMENTS TABLE (Stripe payment records)
-- =====================================================
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  
  -- Stripe details
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT UNIQUE,
  
  -- Payment info
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'gbp',
  payment_type TEXT CHECK (payment_type IN ('deposit', 'full_payment')),
  payment_method TEXT, -- card, apple_pay, google_pay, bank_transfer
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'processing',
    'succeeded',
    'failed',
    'cancelled',
    'refunded'
  )),
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- REFUNDS TABLE
-- =====================================================
CREATE TABLE public.refunds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES public.payments(id) ON DELETE CASCADE,
  
  -- Stripe refund details
  stripe_refund_id TEXT UNIQUE,
  
  -- Refund info
  amount DECIMAL(10,2) NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'processing',
    'succeeded',
    'failed'
  )),
  
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  
  -- Notification details
  type TEXT CHECK (type IN ('booking_confirmation', 'reminder', 'cancellation', 'payment_complete')),
  channel TEXT[] DEFAULT ARRAY['browser'], -- array of: browser, email, sms
  
  -- Content
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Scheduling
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  
  -- Delivery tracking
  email_sent BOOLEAN DEFAULT FALSE,
  sms_sent BOOLEAN DEFAULT FALSE,
  browser_sent BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- Media
  images TEXT[], -- array of image URLs
  
  -- Status
  verified_purchase BOOLEAN DEFAULT TRUE,
  flagged BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- VENDOR AVAILABILITY TABLE (calendar blocking)
-- =====================================================
CREATE TABLE public.vendor_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  
  -- Date/time blocking
  date DATE NOT NULL,
  time_slots TEXT[] NOT NULL, -- array of time slots e.g., ['09:00', '10:00', '11:00']
  
  -- Type
  type TEXT CHECK (type IN ('available', 'blocked', 'booked')),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FAVORITES TABLE (users can favorite vendors)
-- =====================================================
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, vendor_id)
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================

-- Vendors indexes
CREATE INDEX idx_vendors_category ON public.vendors(category);
CREATE INDEX idx_vendors_rating ON public.vendors(rating DESC);
CREATE INDEX idx_vendors_featured ON public.vendors(featured);
CREATE INDEX idx_vendors_user_id ON public.vendors(user_id);

-- Bookings indexes
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_vendor_id ON public.bookings(vendor_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at DESC);

-- Payments indexes
CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);
CREATE INDEX idx_payments_stripe_payment_intent ON public.payments(stripe_payment_intent_id);
CREATE INDEX idx_payments_status ON public.payments(status);

-- Reviews indexes
CREATE INDEX idx_reviews_vendor_id ON public.reviews(vendor_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_scheduled_for ON public.notifications(scheduled_for);
CREATE INDEX idx_notifications_status ON public.notifications(status);

-- Availability indexes
CREATE INDEX idx_vendor_availability_vendor_date ON public.vendor_availability(vendor_id, date);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Vendors policies (public read, owner write)
CREATE POLICY "Anyone can view vendors" ON public.vendors
  FOR SELECT USING (true);
  
CREATE POLICY "Vendors can update own profile" ON public.vendors
  FOR UPDATE USING (auth.uid() = user_id);

-- Vendor services policies
CREATE POLICY "Anyone can view services" ON public.vendor_services
  FOR SELECT USING (true);
  
CREATE POLICY "Vendors can manage own services" ON public.vendor_services
  FOR ALL USING (
    vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid())
  );

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() IN (SELECT user_id FROM public.vendors WHERE id = vendor_id)
  );
  
CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (
    booking_id IN (SELECT id FROM public.bookings WHERE user_id = auth.uid())
  );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);
  
CREATE POLICY "Users can create reviews for own bookings" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can manage own favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON public.vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update vendor rating when review is added
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.vendors
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM public.reviews
      WHERE vendor_id = NEW.vendor_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE vendor_id = NEW.vendor_id
    )
  WHERE id = NEW.vendor_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vendor_rating_trigger AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

-- Update vendor total bookings
CREATE OR REPLACE FUNCTION update_vendor_bookings()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' THEN
    UPDATE public.vendors
    SET total_bookings = total_bookings + 1
    WHERE id = NEW.vendor_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vendor_bookings_trigger AFTER INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_vendor_bookings();

-- =====================================================
-- VIEWS for Analytics
-- =====================================================

-- Vendor performance view
CREATE VIEW vendor_performance AS
SELECT 
  v.id,
  v.business_name,
  v.category,
  v.rating,
  v.total_reviews,
  v.total_bookings,
  COUNT(b.id) FILTER (WHERE b.status = 'completed') as completed_bookings,
  COALESCE(SUM(b.vendor_payout) FILTER (WHERE b.status = 'paid'), 0) as total_earnings,
  COALESCE(AVG(r.rating), 0) as avg_rating
FROM public.vendors v
LEFT JOIN public.bookings b ON v.id = b.vendor_id
LEFT JOIN public.reviews r ON v.id = r.vendor_id
GROUP BY v.id, v.business_name, v.category, v.rating, v.total_reviews, v.total_bookings;

-- Platform revenue view
CREATE VIEW platform_revenue AS
SELECT 
  DATE_TRUNC('month', b.created_at) as month,
  COUNT(*) as total_bookings,
  SUM(b.total_amount) as gross_revenue,
  SUM(b.platform_fee) as platform_earnings,
  SUM(b.vendor_payout) as vendor_payouts
FROM public.bookings b
WHERE b.status = 'paid'
GROUP BY DATE_TRUNC('month', b.created_at)
ORDER BY month DESC;
