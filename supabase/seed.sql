-- AfroLuxe Marketplace - Seed Data for Demo
-- Run this after creating initial schema

-- Note: For demo purposes, we'll create users with known passwords
-- In production, these should be created through the auth.users table properly

-- =====================================================
-- DEMO USERS (Profiles)
-- =====================================================
-- Note: You'll need to create these users through Supabase Auth first
-- Then link them here. For now, we'll use placeholder UUIDs

-- Customer 1: John Customer
INSERT INTO profiles (id, role, name, email, phone)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'customer', 'John Customer', 'customer@example.com', '+447700900000');

-- Customer 2: Sarah Johnson
INSERT INTO profiles (id, role, name, email, phone)
VALUES 
    ('22222222-2222-2222-2222-222222222222', 'customer', 'Sarah Johnson', 'sarah@example.com', '+447700900001');

-- Vendor 1: Afro Braids & Beauty
INSERT INTO profiles (id, role, name, email, phone)
VALUES 
    ('33333333-3333-3333-3333-333333333333', 'vendor', 'Grace Adeyemi', 'grace@afrobraids.com', '+447700900010');

-- Vendor 2: Mama Africa Kitchen
INSERT INTO profiles (id, role, name, email, phone)
VALUES 
    ('44444444-4444-4444-4444-444444444444', 'vendor', 'Amina Hassan', 'amina@mamaafrica.com', '+447700900011');

-- Vendor 3: Ubuntu Tech Repair
INSERT INTO profiles (id, role, name, email, phone)
VALUES 
    ('55555555-5555-5555-5555-555555555555', 'vendor', 'Kwame Mensah', 'kwame@ubuntu.tech', '+447700900012');

-- Vendor 4: Diaspora Threads
INSERT INTO profiles (id, role, name, email, phone)
VALUES 
    ('66666666-6666-6666-6666-666666666666', 'vendor', 'Fatima Diop', 'fatima@diaspora.threads', '+447700900013');

-- Vendor 5: Heritage Music Academy
INSERT INTO profiles (id, role, name, email, phone)
VALUES 
    ('77777777-7777-7777-7777-777777777777', 'vendor', 'Emmanuel Okafor', 'emmanuel@heritage.music', '+447700900014');

-- Admin
INSERT INTO profiles (id, role, name, email, phone)
VALUES 
    ('99999999-9999-9999-9999-999999999999', 'admin', 'Admin User', 'admin@afroluxe.com', '+447700900999');

-- =====================================================
-- VENDORS
-- =====================================================
-- London coordinates: ~51.5074, -0.1278

INSERT INTO vendors (user_id, business_name, bio, category, postcode, lat, lng, radius_km, home_service, verified, active)
VALUES 
    (
        '33333333-3333-3333-3333-333333333333',
        'Afro Braids & Beauty',
        'Specializing in traditional African braiding, weaves, and natural hair care. Over 15 years of experience bringing beauty to the African diaspora community.',
        'Hair Styling',
        'E1 6AN',
        51.5155,
        -0.0636,
        15,
        true,
        true,
        true
    ),
    (
        '44444444-4444-4444-4444-444444444444',
        'Mama Africa Kitchen',
        'Authentic African cuisine with love. From West African jollof to East African sambusa. Catering for all events.',
        'Catering',
        'SE1 7PB',
        51.5033,
        -0.1195,
        20,
        true,
        true,
        true
    ),
    (
        '55555555-5555-5555-5555-555555555555',
        'Ubuntu Tech Repair',
        'Professional phone, laptop, and tablet repair. Quick turnaround, fair prices. Serving the community since 2018.',
        'Tech Services',
        'N1 9AG',
        51.5366,
        -0.1033,
        10,
        false,
        true,
        true
    ),
    (
        '66666666-6666-6666-6666-666666666666',
        'Diaspora Threads',
        'Custom African attire, alterations, and modern fashion with African prints. Every piece tells a story.',
        'Fashion & Tailoring',
        'SW9 8JA',
        51.4648,
        -0.1145,
        12,
        false,
        true,
        true
    ),
    (
        '77777777-7777-7777-7777-777777777777',
        'Heritage Music Academy',
        'Learn traditional African music and instruments. Drums, kora, and more. Classes for all ages.',
        'Education & Tutoring',
        'W10 5NR',
        51.5211,
        -0.2067,
        25,
        true,
        true,
        true
    );

-- =====================================================
-- SERVICES
-- =====================================================

-- Afro Braids & Beauty Services
INSERT INTO services (vendor_id, title, description, price, duration_mins, active)
SELECT 
    id as vendor_id,
    'Box Braids' as title,
    'Classic box braids, various sizes available' as description,
    80.00 as price,
    180 as duration_mins,
    true as active
FROM vendors WHERE business_name = 'Afro Braids & Beauty'
UNION ALL
SELECT id, 'Cornrows', 'Traditional cornrows styling', 50.00, 120, true
FROM vendors WHERE business_name = 'Afro Braids & Beauty'
UNION ALL
SELECT id, 'Weave Installation', 'Professional weave installation', 120.00, 240, true
FROM vendors WHERE business_name = 'Afro Braids & Beauty'
UNION ALL
SELECT id, 'Natural Hair Treatment', 'Deep conditioning and styling', 45.00, 90, true
FROM vendors WHERE business_name = 'Afro Braids & Beauty';

-- Mama Africa Kitchen Services
INSERT INTO services (vendor_id, title, description, price, duration_mins, active)
SELECT 
    id, 'Small Event Catering (10-20 people)', 'Perfect for small gatherings', 250.00, 0, true
FROM vendors WHERE business_name = 'Mama Africa Kitchen'
UNION ALL
SELECT id, 'Large Event Catering (50+ people)', 'Full service catering', 800.00, 0, true
FROM vendors WHERE business_name = 'Mama Africa Kitchen'
UNION ALL
SELECT id, 'Meal Prep Package', '5 meals delivered weekly', 75.00, 0, true
FROM vendors WHERE business_name = 'Mama Africa Kitchen'
UNION ALL
SELECT id, 'Cooking Class', 'Learn to cook authentic dishes', 50.00, 120, true
FROM vendors WHERE business_name = 'Mama Africa Kitchen';

-- Ubuntu Tech Repair Services
INSERT INTO services (vendor_id, title, description, price, duration_mins, active)
SELECT 
    id, 'Phone Screen Replacement', 'iPhone and Android screens', 60.00, 60, true
FROM vendors WHERE business_name = 'Ubuntu Tech Repair'
UNION ALL
SELECT id, 'Laptop Repair', 'Hardware and software issues', 80.00, 120, true
FROM vendors WHERE business_name = 'Ubuntu Tech Repair'
UNION ALL
SELECT id, 'Data Recovery', 'Recover lost data from devices', 100.00, 180, true
FROM vendors WHERE business_name = 'Ubuntu Tech Repair'
UNION ALL
SELECT id, 'Tablet Repair', 'iPad and Android tablet repair', 70.00, 90, true
FROM vendors WHERE business_name = 'Ubuntu Tech Repair';

-- Diaspora Threads Services
INSERT INTO services (vendor_id, title, description, price, duration_mins, active)
SELECT 
    id, 'Custom Dress/Outfit', 'Bespoke African attire', 150.00, 0, true
FROM vendors WHERE business_name = 'Diaspora Threads'
UNION ALL
SELECT id, 'Alterations', 'Professional alterations service', 30.00, 60, true
FROM vendors WHERE business_name = 'Diaspora Threads'
UNION ALL
SELECT id, 'Traditional Wedding Attire', 'Complete wedding outfit', 400.00, 0, true
FROM vendors WHERE business_name = 'Diaspora Threads'
UNION ALL
SELECT id, 'Ankara Designs', 'Modern Ankara fashion pieces', 80.00, 0, true
FROM vendors WHERE business_name = 'Diaspora Threads';

-- Heritage Music Academy Services
INSERT INTO services (vendor_id, title, description, price, duration_mins, active)
SELECT 
    id, 'Drum Lessons (Individual)', 'One-on-one drum instruction', 45.00, 60, true
FROM vendors WHERE business_name = 'Heritage Music Academy'
UNION ALL
SELECT id, 'Group Dance Class', 'Traditional African dance', 25.00, 90, true
FROM vendors WHERE business_name = 'Heritage Music Academy'
UNION ALL
SELECT id, 'Kora Lessons', 'Learn the traditional kora', 50.00, 60, true
FROM vendors WHERE business_name = 'Heritage Music Academy'
UNION ALL
SELECT id, 'Music Theory & History', 'African music education', 40.00, 60, true
FROM vendors WHERE business_name = 'Heritage Music Academy';

-- =====================================================
-- PORTFOLIO IMAGES (Placeholder URLs)
-- =====================================================

INSERT INTO portfolio (vendor_id, image_url, caption)
SELECT 
    id, 
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    'Beautiful box braids'
FROM vendors WHERE business_name = 'Afro Braids & Beauty'
UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800', 'Cornrows styling'
FROM vendors WHERE business_name = 'Afro Braids & Beauty'
UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1583733089874-fc5e7cb1e6ec?w=800', 'Natural hair care'
FROM vendors WHERE business_name = 'Afro Braids & Beauty';

INSERT INTO portfolio (vendor_id, image_url, caption)
SELECT 
    id, 
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    'Jollof rice special'
FROM vendors WHERE business_name = 'Mama Africa Kitchen'
UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800', 'Event catering setup'
FROM vendors WHERE business_name = 'Mama Africa Kitchen';

INSERT INTO portfolio (vendor_id, image_url, caption)
SELECT 
    id, 
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
    'Phone repair service'
FROM vendors WHERE business_name = 'Ubuntu Tech Repair'
UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800', 'Laptop repair'
FROM vendors WHERE business_name = 'Ubuntu Tech Repair';

-- =====================================================
-- SAMPLE FAVORITES
-- =====================================================

INSERT INTO favorites (customer_id, vendor_id)
SELECT 
    '11111111-1111-1111-1111-111111111111',
    id
FROM vendors WHERE business_name = 'Afro Braids & Beauty'
UNION ALL
SELECT '11111111-1111-1111-1111-111111111111', id
FROM vendors WHERE business_name = 'Mama Africa Kitchen';

-- =====================================================
-- SAMPLE BOOKINGS
-- =====================================================

-- Completed booking with review
INSERT INTO bookings (customer_id, vendor_id, service_id, booking_datetime, duration_mins, status, note)
SELECT 
    '11111111-1111-1111-1111-111111111111',
    v.id,
    s.id,
    NOW() - INTERVAL '7 days',
    s.duration_mins,
    'completed',
    'Looking forward to it!'
FROM vendors v
JOIN services s ON s.vendor_id = v.id
WHERE v.business_name = 'Afro Braids & Beauty' AND s.title = 'Box Braids'
LIMIT 1;

-- Pending booking
INSERT INTO bookings (customer_id, vendor_id, service_id, booking_datetime, duration_mins, status, note)
SELECT 
    '11111111-1111-1111-1111-111111111111',
    v.id,
    s.id,
    NOW() + INTERVAL '3 days',
    s.duration_mins,
    'pending',
    'Need catering for 15 people'
FROM vendors v
JOIN services s ON s.vendor_id = v.id
WHERE v.business_name = 'Mama Africa Kitchen' AND s.title LIKE 'Small Event%'
LIMIT 1;

-- Accepted booking
INSERT INTO bookings (customer_id, vendor_id, service_id, booking_datetime, duration_mins, status, note)
SELECT 
    '22222222-2222-2222-2222-222222222222',
    v.id,
    s.id,
    NOW() + INTERVAL '2 days',
    s.duration_mins,
    'accepted',
    'Urgent screen repair needed'
FROM vendors v
JOIN services s ON s.vendor_id = v.id
WHERE v.business_name = 'Ubuntu Tech Repair' AND s.title = 'Phone Screen Replacement'
LIMIT 1;

-- =====================================================
-- SAMPLE REVIEWS
-- =====================================================

INSERT INTO reviews (booking_id, customer_id, vendor_id, rating, comment)
SELECT 
    b.id,
    b.customer_id,
    v.user_id,
    5,
    'Amazing service! Grace did a fantastic job with my box braids. Very professional and the salon is welcoming. Highly recommend!'
FROM bookings b
JOIN vendors v ON b.vendor_id = v.id
WHERE v.business_name = 'Afro Braids & Beauty' AND b.status = 'completed'
LIMIT 1;

-- More sample reviews
INSERT INTO reviews (booking_id, customer_id, vendor_id, rating, comment)
VALUES
    (
        (SELECT id FROM bookings WHERE status = 'completed' LIMIT 1),
        '22222222-2222-2222-2222-222222222222',
        '33333333-3333-3333-3333-333333333333',
        5,
        'Best braids I''ve had in London! Will definitely be back.'
    );

-- =====================================================
-- SAMPLE CONVERSATIONS & MESSAGES
-- =====================================================

-- Conversation between customer and vendor
INSERT INTO conversations (customer_id, vendor_id)
VALUES 
    ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333'),
    ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444'),
    ('22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555');

-- Sample messages
INSERT INTO messages (conversation_id, sender_id, text, read)
SELECT 
    c.id,
    c.customer_id,
    'Hi! Do you have availability this Saturday?',
    true
FROM conversations c
WHERE c.customer_id = '11111111-1111-1111-1111-111111111111' 
  AND c.vendor_id = '33333333-3333-3333-3333-333333333333'
LIMIT 1;

INSERT INTO messages (conversation_id, sender_id, text, read)
SELECT 
    c.id,
    c.vendor_id,
    'Hello! Yes, I have slots available at 10am and 2pm. Which works better for you?',
    true
FROM conversations c
WHERE c.customer_id = '11111111-1111-1111-1111-111111111111' 
  AND c.vendor_id = '33333333-3333-3333-3333-333333333333'
LIMIT 1;

INSERT INTO messages (conversation_id, sender_id, text, read)
SELECT 
    c.id,
    c.customer_id,
    '2pm would be perfect! How long does it usually take?',
    false
FROM conversations c
WHERE c.customer_id = '11111111-1111-1111-1111-111111111111' 
  AND c.vendor_id = '33333333-3333-3333-3333-333333333333'
LIMIT 1;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Demo data seeded successfully!';
    RAISE NOTICE '📧 Demo accounts:';
    RAISE NOTICE '   Customer: customer@example.com';
    RAISE NOTICE '   Vendor: grace@afrobraids.com';
    RAISE NOTICE '   Admin: admin@afroluxe.com';
    RAISE NOTICE '🔑 Create these users in Supabase Auth with password: Demo123!';
END $$;
