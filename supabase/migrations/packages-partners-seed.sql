-- ============================
-- PARTNERS
-- ============================

-- 1) Semiramis Intercontinental
select public.upsert_partner_from_json(
  jsonb_build_object(
    'id','semiramis-intercontinental',
    'name','Semiramis Intercontinental Hotels & Resorts',
    'description','Luxury 5-star hotel located in the heart of Cairo with breathtaking views of the Nile River.',
    'website','https://www.booking.com/hotel/eg/intercontinental-cairo-semiramis.html?msockid=281e045335e26e1b1208112b349e6f83',
    'about','The InterContinental Cairo Semiramis is a landmark hotel in Egypt''s capital, offering unparalleled luxury and service.

With its prime location on the Nile Corniche, the hotel provides easy access to Cairo''s most famous attractions including the Egyptian Museum, Khan el-Khalili bazaar, and the Giza Pyramids.

The hotel features 432 elegantly appointed rooms and suites, multiple dining options, a spa, and extensive meeting facilities.',
    'services', jsonb_build_array(
      'Luxury accommodations',
      'Fine dining restaurants',
      'Spa and wellness center',
      'Business facilities',
      'Concierge services'
    ),
    'logo', jsonb_build_object(
      'small','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC_small.webp',
      'medium','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC_medium.webp',
      'large','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC_large.webp'
    ),
    'media', jsonb_build_array(
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby.webp 1920w',
        'sizes','(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      ),
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay.webp 1920w',
        'sizes','(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      ),
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Intercontinental%20rooms9207.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Intercontinental%20rooms9207-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Intercontinental%20rooms9207-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Intercontinental%20rooms9207.webp 1920w',
        'sizes','(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      ),
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166.webp 1920w',
        'sizes','(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      ),
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196.webp 1920w',
        'sizes','(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      )
    )
  )
);

-- 2) 1001 Luxury
select public.upsert_partner_from_json(
  jsonb_build_object(
    'id','1001-luxury',
    'name','1001 Luxury',
    'description','1001 Luxury offers exclusive, tailor-made luxury travel experiences.',
    'website','https://www.sherinyosry.com/1001-luxury.html/',
    'about','1001 Luxury specializes in crafting bespoke journeys for discerning travelers. We provide unparalleled access to unique destinations and experiences, ensuring every detail is meticulously planned and executed.

Our services range from private jet charters and luxury yacht rentals to personalized cultural tours and exclusive event access. We pride ourselves on delivering exceptional service and unforgettable memories.',
    'services', jsonb_build_array(
      'Bespoke travel planning',
      'Private jet and yacht charters',
      'Luxury accommodations',
      'Exclusive cultural experiences',
      '24/7 concierge service'
    ),
    'logo', jsonb_build_object(
      'small','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001logo_small.webp',
      'medium','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001logo_medium.webp',
      'large','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001logo_large.webp'
    ),
    'media', jsonb_build_array(
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding1_large.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding1_small.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding1_medium.webp 1024w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding1_large.webp 1920w',
        'sizes','(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
      ),
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding2_large.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding2_small.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding2_medium.webp 1024w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding2_large.webp 1920w',
        'sizes','(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
      ),
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding3_large.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding3_small.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding3_medium.webp 1024w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding3_large.webp 1920w',
        'sizes','(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
      ),
      jsonb_build_object(
        'type','image',
        'src','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding4_large.webp',
        'srcSet','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding4_small.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding4_medium.webp 1024w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding4_large.webp 1920w',
        'sizes','(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
      )
    )
  )
);

-- ============================
-- PACKAGES
-- ============================

-- 1) King Tut Royal VIP  (partners: Semiramis as 'hotel')
select public.upsert_package_from_json(
  jsonb_build_object(
    'title','King Tut Royal VIP',
    'image','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-black.webp',
    'icon','crown',
    'isPopular', true,
    'price','€3,900',
    'priceCurrency','EUR',
    'duration','5 Days / 4 Nights (Thursday - Monday)',
    'highlights', jsonb_build_array(
      'Step into the world of the Pharaohs with the King Tut Royal Package, a once-in-a-lifetime experience limited to just 50 privileged travelers each week.',
      'Beginning on Thursday, November 6, 2025, this luxurious 5-day, 4-night program blends Egypt’s royal heritage with modern comfort, world-class hospitality, and curated cultural encounters'
    ),
    'videos', jsonb_build_array(
      jsonb_build_object('id',1,'url','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/king-highlight.m3u8','title','King Tut Royal VIP Package','muted',true)
    ),
    'details', jsonb_build_object(
      'overview','Step into the world of the Pharaohs with the King Tut Royal Package, a once-in-a-lifetime experience limited to just 50 privileged travelers each week. Beginning on Thursday, November 6, 2025, this luxurious 5-day, 4-night program blends Egypt’s royal heritage with modern comfort, world-class hospitality, and curated cultural encounters. With handpicked 5★ partners, seamless private transport, multilingual tour leaders, and exclusive dining experiences facing the Pyramids and on the Nile, this package ensures every moment is exceptional.',
      'accommodation','- 4 nights at Semiramis InterContinental Cairo (5★, Superior Double Room) including daily breakfast',
      'benefits','The King Tut Royal Package is strictly limited to 50 travelers per week, ensuring exclusivity, privacy, and unforgettable service.',
      'booking', jsonb_build_object(
        'companyName','SY Consulting FZ-LLC',
        'address','FOAM1604 Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates',
        'website','www.sherinyosry.com',
        'email','',
        'whatsapp','+201270389777',
        'price','€3900',
        'currency','EUR'
      ),
      'images', jsonb_build_array(
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/royal-vip.webp','Hero'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/vip-h.webp','VIP Hall'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/bus.webp','Luxury Bus'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-black.webp','Hero Black'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/dinner.webp','Dinner'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-focus.webp','Tut Focus'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/pyramids.webp','Pyramids'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/cover.webp','Cover')
      ),
      'itinerary', jsonb_build_array(
        jsonb_build_object('day','Day 1 – Thursday','description', jsonb_build_array(
          'VIP airport meet & greet upon arrival at Cairo International Airport',
          'Private luxury transfer to the Semiramis InterContinental Cairo (5★)',
          'Check-in to Superior Double Room with breakfast',
          'Orientation and welcome briefing with your multilingual Tour Leader & Hostess',
          'Evening free at leisure in the hotel or optional cultural introduction arranged by your host'
        )),
        jsonb_build_object('day','Day 2 – Friday','description', jsonb_build_array(
          'Breakfast at the hotel',
          'Private transfer to the Giza Plateau for a guided visit to the Great Pyramids & Sphinx with your multilingual tour leader',
          'Afternoon return transfer to hotel for relaxation or optional guided shopping tour',
          'Evening: Private transfer to Khufu Restaurant for a Sunset Dinner facing the Great Pyramids',
          'After dinner: Private transfer back to Semiramis InterContinental Cairo for overnight stay'
        )),
        jsonb_build_object('day','Day 3 – Saturday','description', jsonb_build_array(
          'Breakfast at the hotel',
          'Private transfer to the Grand Egyptian Museum',
          'Full-day curated tour with Egyptologists, highlighting the treasures of Tutankhamun',
          'Evening return transfer to hotel',
          'Dinner at Semiramis InterContinental Cairo (included)',
          'Overnight stay at the hotel'
        )),
        jsonb_build_object('day','Day 4 – Sunday','description', jsonb_build_array(
          'Breakfast at the hotel',
          'Morning free to enjoy hotel facilities or optional guided excursions',
          'Evening: Private transfer to the Four Seasons First Nile Boat for a luxury Dinner on the Nile with gourmet dining and live entertainment',
          'Transfer back to hotel for final overnight stay'
        )),
        jsonb_build_object('day','Day 5 – Monday','description', jsonb_build_array(
          'Breakfast at the hotel',
          'Check-out with hostess assistance',
          'Private transfer to Cairo International Airport',
          'Farewell gift: Exclusive King Tut Royal Perfume bottle for each traveler'
        ))
      )
    ),
    'partners', jsonb_build_array(
      jsonb_build_object('id','semiramis-intercontinental','role','hotel','isPrimary',true,'position',1)
    )
  )
);

-- 2) King Tut VIP One Day  (no partners)
select public.upsert_package_from_json(
  jsonb_build_object(
    'title','King Tut VIP One Day',
    'image','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/vip-h.webp',
    'icon','star',
    'isPopular', false,
    'price','€1200',
    'priceCurrency','EUR',
    'duration','1 Day (Any Day)',
    'highlights', jsonb_build_array(
      'Private guided tour of Giza Pyramids & Sphinx',
      'Entry to the Grand Egyptian Museum',
      'Luxury lunch with Pyramid views',
      'Available daily',
      'Book at least 48 hours in advance'
    ),
    'videos', jsonb_build_array(
      jsonb_build_object('id',2,'url','https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/king-music.m3u8','title','King Tut VIP One Day Package','muted',true)
    ),
    'details', jsonb_build_object(
      'overview','Discover the wonders of ancient Egypt in a single day with the King Tut VIP One Day Package. This exclusive tour offers a private, guided experience to the iconic Giza Pyramids, the Sphinx, and the Grand Egyptian Museum, complete with luxury transport and a gourmet lunch.',
      'accommodation','N/A',
      'benefits','Private Egyptologist guide
All entry fees included
Luxury air-conditioned transport
Personalized experience',
      'booking', jsonb_build_object(
        'companyName','SY Consulting FZ-LLC',
        'address','FOAM1604 Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates',
        'website','www.sherinyosry.com',
        'email','',
        'whatsapp','+201270389777',
        'price','€1200',
        'currency','EUR'
      ),
      'images', jsonb_build_array(
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-focus.webp','Tut Focus'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/pyramids.webp','Pyramids'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/dinner.webp','Dinner'),
        jsonb_build_array('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/pack.webp','Pack')
      ),
      'itinerary', jsonb_build_array(
        jsonb_build_object('day','Morning','description', jsonb_build_array(
          'Private pick-up from your Cairo hotel',
          'Guided tour of Giza Pyramids and Sphinx',
          'Camel ride experience (optional)'
        )),
        jsonb_build_object('day','Afternoon','description', jsonb_build_array(
          'Luxury lunch at a restaurant with panoramic Pyramid views',
          'Visit to the Grand Egyptian Museum with a private guide',
          'Explore the treasures of King Tutankhamun'
        )),
        jsonb_build_object('day','Evening','description', jsonb_build_array(
          'Return to your hotel'
        ))
      )
    )
    -- partners omitted -> zero links (works with the updated views)
  )
);
