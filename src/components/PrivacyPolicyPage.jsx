import React from 'react'
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  document.title = 'Privacy Policy'
  const policies = [
    "To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.",
    "To improve our website in order to better serve you.",
    "To allow us to better service you in responding to your customer service requests.",
    "To ask for ratings and reviews of services or products.",
    "To follow up with them after correspondence (live chat, email, or phone inquiries)."
  ];

  return (
    <>
    <div>
      <h2 className='text-4xl my-4'>Privacy Policy</h2>
      <p className='text-base'>
        This privacy policy has been compiled to better serve those who are concerned with how their Personal information is being used online. Privacy Policy tells about the information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
      </p>

      <h2 className='text-xl font-bold mt-4'>What personal information do we collect from the people that visit our blog, website or app?</h2>
      <p className='text-base'>
        hen ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or other details to help you with your experience.
      </p>

      <h2 className='text-xl font-bold mt-4'>
      When do we collect information?
      </h2>
      <p className='text-base'>
      We collect information from you when you register on our site, place an order, subscribe to a newsletter, respond to a survey or enter information on our site. Provide us with feedback on our products or services 
      </p>

      <h2 className='text-xl font-bold mt-4'>
      How do we use your information?
      </h2>
      <p className='text-base'>
      We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:
      <ul className="list-disc pl-6 space-y-2">
        {policies.map((policy, index) => (
          <li key={index}>{policy}</li>
        ))}
      </ul>
      </p>
      

      {/* How do we protect visitor information? */}
      <h2 className="text-xl font-bold mt-6">How do we protect visitor information?</h2>
      <p className="text-base mt-2">
        Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your 
        visit to our site as safe as possible. Your personal information is contained behind secured networks and is 
        only accessible by a limited number of persons who have special access rights to such systems and are required 
        to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via 
        Secure Socket Layer (SSL) technology.
      </p>
      <p className="text-base mt-2">
        We implement a variety of security measures when a user places an order, enters, submits, or accesses their 
        information to maintain the safety of your personal information. All transactions are processed through a 
        gateway provider and are not stored or processed on our servers.
      </p>

      {/* Do we use cookies? */}
      <h2 className="text-xl font-bold mt-6">Do we use 'cookies'?</h2>
      <p className="text-base mt-2">
        Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through 
        your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser 
        and capture and remember certain information.
      </p>
      <p className="text-base mt-2">
        We use cookies to:
      </p>
      <ul className="list-disc pl-6 text-base">
        <li>Help remember and process the items in the shopping cart.</li>
        <li>Understand and save user's preferences for future visits.</li>
        <li>Keep track of advertisements.</li>
        <li>Compile aggregate data about site traffic and site interactions to offer better site experiences and tools in the future.</li>
      </ul>
      <p className="text-base mt-2">
        You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off 
        all cookies through your browser settings. If you disable cookies, some features will be disabled, but you can 
        still place orders.
      </p>

      {/* Third-party disclosure */}
      <h2 className="text-xl font-bold mt-6">Third-party disclosure</h2>
      <p className="text-base mt-2">
        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless 
        we provide users with advance notice. This does not include website hosting partners and other parties who assist 
        us in operating our website, conducting our business, or serving our users, so long as those parties agree to 
        keep this information confidential.
      </p>

      {/* Third-party links */}
      <h2 className="text-xl font-bold mt-6">Third-party links</h2>
      <p className="text-base mt-2">
        Occasionally, we may include or offer third-party products or services on our website. These third-party sites 
        have separate and independent privacy policies. We have no responsibility or liability for the content and 
        activities of these linked sites. However, we seek to protect the integrity of our site and welcome any feedback 
        about these sites.
      </p>

      {/* Google */}
      <h2 className="text-xl font-bold mt-6">Google</h2>
      <p className="text-base mt-2">
        Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to 
        provide a positive experience for users. 
        <a 
          href="https://support.google.com/adwordspolicy/answer/1316548?hl=en" 
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>.
      </p>
      <p className="text-base mt-2">
        We have not enabled Google AdSense on our site but we may do so in the future.
      </p>
      

      <h2 className="text-xl font-bold mt-4">
  How do I get Updates on Privacy Policy?
</h2>
<p className="text-base">
  Users can visit our site anonymously. Once this privacy policy is created, we will add a link to it on our home page or at a minimum on the first significant page after entering our website. Our Privacy Policy link includes the word 'Privacy' and can be easily found on the specified page.
</p>
<p className="text-base">
  Users will be notified of any privacy policy changes:
</p>
<ul className="list-disc pl-5">
  <li>On our Privacy Policy Page</li>
</ul>
<p className="text-base">
  Users are able to change their personal information:
</p>
<ul className="list-disc pl-5">
  <li>By logging in to their account</li>
</ul>

<h2 className="text-xl font-bold mt-4">
  How does our site handle Do Not Track signals?
</h2>
<p className="text-base">
  We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.
</p>

<h2 className="text-xl font-bold mt-4">
  Does our site allow third-party behavioral tracking?
</h2>
<p className="text-base">
  It's also important to note that we allow third-party behavioral tracking.
</p>

<h2 className="text-xl font-bold mt-4">
  Fair Information Practices & Data Breach Notification
</h2>
<p className="text-base">
  In order to be in line with Fair Information Practices, we will take the following responsive action, should a data breach occur:
</p>
<ul className="list-disc pl-5">
  <li>We will notify the users via in-site notification.</li>
  <li>We will also notify users within 4 working days via email.</li>
</ul>

<h2 className="text-xl font-bold mt-4">
  Why do we collect your email address?
</h2>
<p className="text-base">
  We collect your email address in order to:
</p>
<ul className="list-disc pl-5">
  <li>Send information, respond to inquiries, and/or other requests or questions.</li>
  <li>Process orders and send information and updates pertaining to orders.</li>
  <li>Send additional information related to your product and/or service.</li>
  <li>Market to our mailing list or continue sending emails to clients after a transaction has occurred.</li>
</ul>
<p className="text-base">
  If at any time you would like to unsubscribe from receiving future emails, you can email us at <a href="mailto:info@nirmanbazaar.com" className="text-blue-500">info@nirmanbazaar.com</a> and we will promptly remove you from all correspondence.
</p>

<h2 className="text-xl font-bold mt-4">
  Contacting Us
</h2>
<p className="text-base">
  If there are any questions regarding this privacy policy, you may contact us using the information below:
</p>
<p className="text-base font-semibold">Website: <Link to="https://www.nirmanbazaar.com" className="text-blue-500">www.nirmanbazaar.com</Link></p>
<p className="text-base font-semibold">Address: Tower 71, ECB Chatter, Dhaka Cantonment, Dhaka 1206.</p>
<p className="text-base font-semibold">Email: <Link to="mailto:info@nirmanbazaar.com" className="text-blue-500">info@nirmanbazaar.com</Link></p>




    </div>
    
    </>
  )
}
