# Porch

A small place for your friends. The feed ends instead of scrolling forever, and every Monday and Thursday everyone answers the same question.

Static site (`index.html`, `app.js`) hosted on GitHub Pages, with data in Supabase.

## Setup

1. Create a free project at supabase.com.
2. In the project, open **SQL Editor**, paste all of `schema.sql`, and click **Run**.
3. Go to **Project Settings → API** and copy the **Project URL** and the **anon public** key into `config.js`.
4. Push to GitHub and turn on **Settings → Pages → Deploy from branch → main**.

## How prompts work

Each Monday and Thursday, the first person to open the site triggers that day's prompt. It takes the oldest question in the prompt bank, or one from the default list in `app.js` if the bank is empty.

## Known limits (for now)

- Anyone with the link can join. There are no passwords; your identity is remembered in your browser.
- Answers are hidden in the page until you answer, but a technical person could still read them from the database.
