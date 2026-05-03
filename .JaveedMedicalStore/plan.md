# Javed Medical Store — Full Build Plan

Phase 1: Foundation & Design System

We need to set up a medical theme. Let's use primary teal (#00A896), background light mint (#F0F9F7), surface white (#FFFFFF), text primary dark teal (#1A3A3A), text secondary gray (#7F8C8D), accent soft red for alerts/Rx badge (#FF6B6B), success green (#27AE60), warning orange (#F39C12), error red (#E74C3C). The typography should be clean with soft shadows.

I'll create reusable layout components like a Header (with a logo, search, cart icon with red badge, auth), Footer (store info, contact, our Phool Nagar address), and a Mobile hamburger menu.

Navigation links: Home, Products, Cart, Account, Track Order.

Phase 2: Database & Auth 

Tables needed: 
- products (name, brand, price, category, image_url, stock, prescription_required, description, active)
- orders (order_number JMS-XXXXX, status, total, shipping_address, phone, payment_method, user_id)
- order_items
- customers/profiles
- wishlist
- prescriptions (image_url, status, admin_notes)

Auth: Need Email/phone login & registration, and guest checkout support.

Storage: A bucket for product images, and another for prescription uploads.

I'll seed all 28 products into the database with correct categories and prices.

Phase 3: Customer Site Pages

Homepage: Needs a hero slider with pharmacy imagery, a search bar, 6 category cards (Tablets, Capsules, Syrups, Injections, Ointments, First Aid), and a featured products grid.

Products page: A grid layout with filters (category, price range, prescription required toggle), search, and sort (price, name). The product cards should show the image, name, brand, price in teal (#00A896), Add to Cart button in teal (#00A896), wishlist heart, and a red (#FF6B6B) "Rx" badge for prescription items.

Product detail page: Full info, add to cart with quantity selector, and related products.

Cart: Slide-out drawer on "Add to Cart" + dedicated /cart page. Users should be able to adjust quantity, remove items, and see subtotal/total.

Checkout: 3-step flow 
- Step 1: Shipping form (name, phone, address in Pakistan)
- Step 2: Payment selection (COD working, JazzCash/EasyPaisa/Card shown as UI)
- Step 3: Review & Place Order

Order success page: Needs to show the order number JMS-XXXXX, estimated delivery, order summary with a green (#27AE60) success check.

Track order page: Users will enter order number + phone → see status timeline (Pending → Confirmed → Processing → Shipped → Delivered).

Account dashboard: Order history, saved addresses, and prescription upload history.

Wishlist page: Saved items grid, with a "Move to Cart" button.

Phase 4: Admin Panel (/admin)

Admin login: Secure with a separate auth check, a dark-themed UI with background slate 900 (#0F172A), surface slate 800 (#1E293B), primary teal (#00A896), text white (#F8FAFC), success green (#27AE60), warning orange (#F39C12), error red (#E74C3C).

Dashboard: Stats cards (today's orders, revenue, products count, low stock alerts), recent orders table, and sales chart.

Products management: Table view to add/edit/delete, toggle visibility, manage stock, prescription required toggle, and image upload.

Orders management: List with status filter tabs, detail view with status update dropdown, and print invoice button.

Prescriptions management: Tabs for Pending/Approved/Rejected. Admins should be able to view the uploaded image, approve/reject with a reason field.

Customers list: Customer table showing order count, and a click to view details.

Phase 5: Polish & Responsiveness

Let's make sure it's a mobile-first responsive design across all pages.
Add proper loading states, empty states, and error handling.
Include toast notifications for cart actions and order placement.
Use Lucide medical icons throughout (Pill, Syringe, Cross, Heart, etc.).

ADDITIONAL FEATURES: Real-time stock update when an order is placed, low stock alert in admin, order status change notifications, prescription required block on checkout if applicable, search autocomplete, product image zoom on hover, invoice PDF generation, and customer phone verification via OTP.
