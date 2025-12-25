# EmailJS Setup Instructions

To make the contact form work and send emails, you need to set up EmailJS (it's free for up to 200 emails/month).

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID** (you'll need this)

## Step 3: Create an Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:
   ```
   Subject: {{subject}}
   
   From: {{from_name}} ({{from_email}})
   
   Message:
   {{message}}
   ```
4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

## Step 5: Update contact.js
Open `contact.js` and replace these values:

1. Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key (line 5)
2. Replace `YOUR_SERVICE_ID` with your Service ID (line 25)
3. Replace `YOUR_TEMPLATE_ID` with your Template ID (line 26)
4. Update `to_email: 'info@trendymb.com'` with your actual email address (line 33)

## Example:
```javascript
emailjs.init('abc123xyz'); // Your Public Key
const serviceID = 'service_abc123';
const templateID = 'template_xyz789';
```

## Alternative: Formspree (Easier Option)
If you prefer an even simpler setup:

1. Go to https://formspree.io/
2. Sign up for free
3. Create a new form
4. Get your form endpoint URL
5. Update the form in contact.html to use Formspree instead

Would you like me to set up Formspree instead? It's even easier - just requires changing the form action attribute.


