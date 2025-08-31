import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: August 26, 2025</p>
          
          <p>
            World In Style operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). World In Style is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
          </p>
          
          <p>
            Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
          </p>

          <section>
            <h3 className="text-lg font-semibold mb-3">Personal Information We Collect or Process</h3>
            <p className="mb-3">
              When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact details</strong> including your name, address, billing address, shipping address, phone number, and email address.</li>
              <li><strong>Financial information</strong> including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.</li>
              <li><strong>Account information</strong> including your username, password, security questions, preferences and settings.</li>
              <li><strong>Transaction information</strong> including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
              <li><strong>Communications with us</strong> including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
              <li><strong>Device information</strong> including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
              <li><strong>Usage information</strong> including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Personal Information Sources</h3>
            <p className="mb-3">We may collect personal information from the following sources:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Directly from you</strong> including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;</li>
              <li><strong>Automatically through the Services</strong> including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;</li>
              <li><strong>From our service providers</strong> including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;</li>
              <li><strong>From our partners or other third parties.</strong></li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">How We Use Your Personal Information</h3>
            <p className="mb-3">Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Provide, Tailor, and Improve the Services.</strong> We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you, such as recommending products related to your purchases. This may include using your personal information to better tailor and improve the Services.</li>
              <li><strong>Marketing and Advertising.</strong> We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services.</li>
               <li><strong>Security and Fraud Prevention.</strong> We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password or other access details with anyone else.</li>
               <li><strong>Communicating with You.</strong> We use your personal information to provide you with customer support, to be responsive to you, to provide effective services to you and to maintain our business relationship with you.</li>
               <li><strong>Legal Reasons.</strong> We use your personal information to comply with applicable law or respond to valid legal process, including requests from law enforcement or government agencies, to investigate or participate in civil discovery, potential or actual litigation, or other adversarial legal proceedings, and to enforce or investigate potential violations of our terms or policies.</li>
             </ul>
           </section>

           <section>
             <h3 className="text-lg font-semibold mb-3">How We Disclose Personal Information</h3>
             <p className="mb-3">In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:</p>
             <ul className="list-disc pl-6 space-y-2">
               <li>With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
               <li>With business and marketing partners to provide marketing services and advertise to you. For example, we use Shopify to support personalized advertising with third-party services based on your online activity with different merchants and websites. Our business and marketing partners will use your information in accordance with their own privacy notices. Depending on where you reside, you may have a right to direct us not to share information about you to show you targeted advertisements and marketing based on your online activity with different merchants and websites. You can exercise your rights to opt-out of those uses here.</li>
               <li>When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations.</li>
               <li>With our affiliates or otherwise within our corporate group.</li>
               <li>In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service or policies, and to protect or defend the Services, our rights, and the rights of our users or others.</li>
             </ul>
           </section>

           <section>
             <h3 className="text-lg font-semibold mb-3">Relationship with Shopify</h3>
             <p className="mb-3">
               The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in countries other than where you reside, in order to provide and improve the Services for you. In addition, to help protect, grow, and improve our business, we use certain Shopify enhanced features that incorporate data and information obtained from your interactions with our Store, along with other merchants and with Shopify. To provide these enhanced features, Shopify may make use of personal information collected about your interactions with our store, along with other merchants, and with Shopify. In these circumstances, Shopify is responsible for the processing of your personal information, including for responding to your requests to exercise your rights over use of your personal information for these purposes. To learn more about how Shopify uses your personal information and any rights you may have, you can visit the Shopify Consumer Privacy Policy. Depending on where you live, you may exercise certain rights with respect to your personal information here Shopify Privacy Portal Link.
             </p>
           </section>

           <section>
             <h3 className="text-lg font-semibold mb-3">Third Party Websites and Links</h3>
             <p className="mb-3">
               The Services may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.
             </p>
           </section>

           <section>
             <h3 className="text-lg font-semibold mb-3">Children's Data</h3>
             <p className="mb-3">
               The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority in your jurisdiction. If you are the parent or guardian of a child under the age of majority and believe that your child has provided us with personal information, you may contact us using the contact details set out below to request that it be deleted.As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we "share" or "sell" (as those terms are defined in applicable law) personal information of individuals under 16 years of age.
             </p>
           </section>

           <section>
             <h3 className="text-lg font-semibold mb-3">Security and Retention of Your Information</h3>
             <p className="mb-3">
              Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.

              How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
             </p>
           </section>

           <section>
             <h3 className="text-lg font-semibold mb-3">Your Rights and Choices</h3>
             <p className="mb-3">
              Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.
              <ul className="list-disc pl-6 space-y-2">
               <li><b>Right to Access / Know</b>. You may have a right to request access to personal information that we hold about you.</li>
               <li><b>Right to Delete</b>. You may have a right to request that we delete personal information we maintain about you.</li>
               <li><b>Right to Correct</b>. You may have a right to request that we correct inaccurate personal information we maintain about you.</li>
               <li><b>Right of Portability</b>. You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.</li>
               <li><b>Right to Opt out of Sale or Sharing for Targeted Advertising</b>. Depending on where you reside, you may have a right to opt out of the "sale" or "share" of your personal information or to opt out of the processing of your personal information for purposes considered to be "targeted advertising", as defined in applicable privacy laws. You can exercise your rights to opt-out of those uses here. Please note that if you visit our website with the Global Privacy Control opt-out preference signal enabled, depending on where you are, we will automatically treat this as a request to opt-out for the device and browser that you use to visit the website. If we are able to associate the device sending the signal to a Shopify account, we will apply the opt out request to the account as well. To learn more about Global Privacy Control, you can visit https://globalprivacycontrol.org/. Other than the Global Privacy Control, we do not recognize other "Do Not Track" signals that may be sent from your web browser or device.</li>
               <li><b>Managing Communication Preferences</b>. We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.</li>
             </ul>

             <b>If you reside in the UK or European Economic Area</b>, and subject to exceptions and limitations provided by local law, you may exercise the following rights in addition to the rights outlined above:

              <ul className="list-disc pl-6 space-y-2">
                <li><b>Objection to Processing and Restriction of Processing:</b>You may have the right to ask us to stop or restrict our processing of personal information for certain purposes.</li>
                <li><b>Withdrawal of Consent:</b>Where we rely on consent to process your personal information, you have the right to withdraw this consent. If you withdraw your consent, this will not affect the lawfulness of any processing based on your consent before its withdrawal.</li>
              </ul>
             </p>

             <p className="mb-3">
              You may exercise any of these rights where indicated on the Services or by contacting us using the contact details provided below. To learn more about how Shopify uses your personal information and any rights you may have, including rights related to data processed by Shopify, you can visit https://privacy.shopify.com/en.
             </p>

             <p className="mb-3">
              We will not discriminate against you for exercising any of these rights. We may need to verify your identity before we can process your requests, as permitted or required under applicable law. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law.
             </p>
           </section>

           <section>
              <h3 className="text-lg font-semibold mb-3">Complaints</h3>
              <p className="mb-3">
                If you have complaints about how we process your personal information, please contact us using the contact details provided below. Depending on where you live, you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority. For the EEA, you can find a list of the responsible data protection supervisory authorities <a href="https://edpb.europa.eu/about-edpb/about-edpb/members">here</a>.
              </p>
           </section>

           <section>
              <h3 className="text-lg font-semibold mb-3">International Transfers</h3>
              <p className="mb-3">
                Please note that we may transfer, store and process your personal information outside the country you live in.
              </p>
              <p className="mb-3">
              If we transfer your personal information out of the European Economic Area or the United Kingdom, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.
              </p>
           </section>

           <section>
              <h3 className="text-lg font-semibold mb-3">Changes to This Privacy Policy</h3>

              <p className="mb-3">
                We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons.
                We will post the revised Privacy Policy on this website, update the "Last updated" date and provide notice as required by applicable law.
              </p>
           </section>

           <section>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>

              <p className="mb-3">
                Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at worldinstyleagency@gmail.com or contact us at Al Hamra Freezone RAK, FOAM1604 Compass Building, Ras Al-Khaimah, RK, AE For the purpose of applicable data protection laws, we are the data controller of your personal information.
              </p>
           </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;