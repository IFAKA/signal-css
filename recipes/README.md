# Signal CSS recipes

Recipes are copyable HTML patterns. They are intentionally separate from the CSS core: start with native HTML, add a `data-variant` when tone changes, and add a class only for a documented layout or relationship.

## Button

```html
<button type="button">Save</button>
<button type="button" data-variant="secondary">Cancel</button>
<button type="button" data-variant="danger">Delete</button>
```

## Form field

```html
<div class="field">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" aria-describedby="email-help">
  <p id="email-help" class="field-description">We will only use this for account updates.</p>
</div>
```

## Card, alert, navigation, table, dialog, tabs, empty, and loading

```html
<article class="card"><h2>System health</h2><progress max="100" value="98">98%</progress></article>
<p class="alert" role="status">Saved successfully.</p>
<nav aria-label="Sections"><a href="/docs" aria-current="page">Docs</a></nav>
<table class="data-table"><caption>Deployments</caption><thead><tr><th scope="col">Service</th></tr></thead><tbody><tr><td>API</td></tr></tbody></table>
<dialog open aria-labelledby="dialog-title"><h2 id="dialog-title">Confirm</h2><button type="button">Close</button></dialog>
<nav class="tabs" aria-label="Reports"><a href="/reports" aria-current="page">Overview</a><a href="/reports/activity">Activity</a></nav>
<section class="empty-state"><h2>No reports yet</h2><button type="button">Create a report</button></section>
<p role="status" aria-live="polite">Loading…</p>
```
