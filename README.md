# BookNook – A Small Online Library

**Live site:** https://booknook-client-xmys.vercel.app

BookNook is a small online library. Add a book, borrow a book, return a book.

> The server runs on a free plan, so the first load after a quiet period can take up to a minute.

## Features

- Home page with a Swiper slider, the 6 newest books from the database, and sections on how borrowing works and top categories
- Register and log in with email and password or with Google, using BetterAuth with the MongoDB adapter, plus password validation
- Private routes that keep you logged in after a reload and send you back to the page you wanted after login
- Add a book with a cover image uploaded to imgbb, a category and a total copies count
- My Books page to edit a book with a prefilled form and delete it with a confirm modal
- Borrow a book from its details page, see it in My Borrows and return it
- Available copies change with every borrow and return, double borrowing is blocked, and a book with no copies shows "Not Available"
- JWT-protected Express API
- Dark and light theme, Framer Motion animations, toast messages, a custom 404 page and a fully responsive layout

## Tech Stack

Next.js (App Router), TypeScript, Tailwind CSS, daisyUI, BetterAuth, MongoDB, Swiper, Framer Motion, React Hot Toast

## Server Repository

https://github.com/rumki8565/booknook-server

## Run Locally

1. Install the packages: `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values
3. Start the project: `npm run dev`

The app needs the BookNook server running, see the server repository.
