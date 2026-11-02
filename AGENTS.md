# Signal CSS agent contract

Use semantic HTML first: element, native state/ARIA, parent context, sibling relationship, then an approved layout or pattern class. Buttons are styled natively; use `data-variant="primary|secondary|danger|quiet"` for tone. Never add `.button`, `.signal-button`, `.signal-input`, or role-repeating classes.

Approved layout vocabulary: `.shell`, `.layout`, `.grid`, `.row`, `.stack`, `.cluster`, `.readable`. Approved repeated patterns include `.card`, `.field`, `.alert`, `.badge`, `.callout`, `.tabs`, `.data-table`, `.empty-state`, and `.message`.

Import `core.css` for native defaults, `layout.css` for relationships, `forms.css` for fields, `navigation.css` for navigation, `data.css` for tables/status, `overlays.css` for dialog/popover/disclosure, and `components.css` only for optional richer patterns. `styles.css` remains the complete aggregate; `animations.css` is optional.

When interaction exceeds native HTML, use the companion React package. It consumes this CSS contract and must not introduce a competing styling vocabulary.
