# Targeted B2B lead research website

A responsive static website prepared for GitHub Pages. It uses plain HTML, CSS, and JavaScript, so there is no package installation, Node build step, or server-side code required. Headings use a consistent sentence-case style (while brand names and acronyms retain their proper capitalization), with different visual hierarchy for page, section, and card headings.

## Included files

```text
index.html                  Main page (keep this at the publishing root)
404.html                    Custom not-found page
.nojekyll                   Tells GitHub Pages to serve the static files directly
assets/css/styles.css       Layout, blue/white/navy theme, yellow accents, responsive rules
assets/js/main.js           Navigation, table filtering, CSV download, quote form actions
assets/images/brand-mark.svg Temporary B2B brand mark; replace with the final logo later
assets/sample-leads.csv     Illustrative sample rows only
```

## Publish with GitHub Pages

1. Download and extract this ZIP on your computer.
2. Create a GitHub repository. For a simple branch-based Pages deployment, a public repository is available on GitHub Free.
3. Upload the **contents** of the extracted folder to the top level of the repository. `index.html` must be at the root, not buried in an extra folder.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**; select branch `main` and folder `/(root)`, then save.
6. Wait for the Pages deployment to finish. GitHub displays the published URL in Settings → Pages. First deployment or updates may take a few minutes.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Contact and social links

The new WhatsApp number and email are set in `index.html` and `assets/js/main.js`. WhatsApp links open a prefilled message. The quote form prepares an email through `mailto:`; it does **not** submit to a server and cannot send by itself. The visitor must confirm sending in their email app or WhatsApp.

The social links added are both LinkedIn profiles, Medium, X, and Pinterest, as provided for this site.

## Replace the temporary mark with the final logo

When the final logo is ready, replace `assets/images/brand-mark.svg` and keep that same filename (or update the two image references in `index.html`). The current mark is a temporary placeholder, not the final brand logo.

## About the lead sample

The table and downloadable CSV use clearly illustrative demo rows and reserved `.example` domains. They are not real, verified leads. Replace the demo rows with authorized sample data before representing them as actual work.

## Important implementation note

The original uploaded website archive contained a compiled page snapshot and a bundled JavaScript file, but it did not contain its original editable React/Vite project source. This ZIP is therefore a clean, editable static reconstruction based on the available page content and features, not a recovered copy of the original source repository. The paths are relative so the site can work when published at a GitHub Pages project URL.
