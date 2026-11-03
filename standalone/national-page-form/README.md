# National page form

A standalone form for national movements to send in the content of their
country page. It is separate from the Lausanne Europe website and can be
hosted on its own.

- `index.html`: the form. Answers are saved automatically in the visitor's
  browser as they type, until they press Send for review. Netlify only
  receives the final answers; drafts never leave the browser.
- `preview.html`: the visitor's own page built from their saved answers, with
  grey placeholder text for anything still empty.
- `example.html`: the fictional Genovia page, showing a finished result.
- `thanks.html`: shown after sending; clears the saved draft.

## Hosting on Netlify (collects the answers)

1. Create a free account at https://app.netlify.com.
2. Add new project → Deploy manually → drag this folder onto the page.
3. Project configuration → Forms → enable form detection, then drag the
   folder again so Netlify finds the `national-page` form.
4. Forms → Form notifications → add an email notification so each
   submission arrives in your inbox.
5. Send the site link to the national coordinators.

Submissions appear under Forms → `national-page`, listed by country. They
can be exported as CSV. Links and events/content arrive as the free text the
coordinator pasted in.

Check the current free-plan limits for form submissions at
https://www.netlify.com/pricing before sending the link out.

## Previewing locally

Open the folder with any static server. On `localhost` the form does not
send anything; Send for review goes straight to the thank-you page and keeps
the draft.
