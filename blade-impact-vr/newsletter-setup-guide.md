# Newsletter Setup Guide for Blade Impact VR

## Free Newsletter Service Options

Here are the easiest and most cost-effective ways to add newsletter functionality to your landing page:

### 1. **FormSubmit.co** (Recommended for simplicity)

- **Cost**: Completely free
- **Setup Time**: 5 minutes
- **Features**: Email forwarding, no backend needed
- **How to use**:
  1. Replace the form action in your HTML with: `action="https://formsubmit.co/YOUR-EMAIL@EXAMPLE.COM"`
  2. Add a hidden input for redirect: `<input type="hidden" name="_next" value="https://yourdomain.com/thank-you">`
  3. That's it! Emails will be forwarded to you

### 2. **Mailchimp** (Best for features)

- **Cost**: Free up to 500 contacts
- **Features**: Email automation, templates, analytics
- **Setup**: Create account, get embed code, replace form
- **Website**: [mailchimp.com](https://mailchimp.com)

### 3. **ConvertKit** (Best for creators)

- **Cost**: Free up to 1,000 subscribers
- **Features**: Advanced automation, tagging, sequences
- **Setup**: Sign up, create form, embed code
- **Website**: [convertkit.com](https://convertkit.com)

### 4. **Google Forms + Sheets** (Simplest DIY)

- **Cost**: Completely free
- **Features**: Basic data collection, integrates with Google Sheets
- **Setup**: Create form, embed or link to it
- **Note**: Less professional looking but functional

### 5. **Netlify Forms** (If hosting on Netlify)

- **Cost**: Free up to 100 submissions/month
- **Features**: Built into Netlify hosting
- **Setup**: Add `netlify` attribute to your form tag

## Quick Implementation with FormSubmit

To implement the easiest solution right now, update your form in the HTML:

```html
<form
  class="newsletter-form"
  action="https://formsubmit.co/petr.vnenk@gmail.com"
  method="POST"
>
  <input
    type="hidden"
    name="_subject"
    value="New Blade Impact VR Newsletter Subscription"
  />
  <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />
  <input type="hidden" name="_captcha" value="false" />
  <input
    type="email"
    class="newsletter-input"
    name="email"
    placeholder="Enter your email"
    required
  />
  <button type="submit" class="newsletter-button">Subscribe</button>
</form>
```

## Next Steps

1. Choose a service based on your needs
2. For FormSubmit: Just update the email in the action URL
3. For other services: Sign up and follow their embed instructions
4. Consider creating a simple thank-you page for after submission

## Privacy Considerations

Remember to:

- Update your privacy policy to mention newsletter subscriptions
- Add clear unsubscribe information in your emails
- Be transparent about how you'll use subscriber data
