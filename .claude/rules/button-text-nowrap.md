# Button Text Must Never Wrap

All buttons with text labels MUST include `whitespace-nowrap` in their className to prevent text from wrapping to multiple lines. This applies to every Button component in the project — navigation buttons, action buttons, link buttons, etc.

Never create a button where the text can overflow onto a second line. If the text is too long, either shorten the label or increase the button size — never allow wrapping.
