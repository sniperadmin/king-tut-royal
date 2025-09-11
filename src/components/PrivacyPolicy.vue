<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-gray-900 p-8 rounded-lg shadow-lg max-w-4xl w-full text-white relative">
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
      <h2 class="text-3xl font-bold mb-6 text-amber-400">Privacy Policy</h2>
      <div class="max-h-[70vh] overflow-y-auto pr-4">
        <h2 class="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p class="mb-4"><strong>Last Updated:</strong> August 24, 2023</p>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">1. Introduction</h3>
        <p class="mb-4">
          This Privacy Policy describes how [Company Name] (the "Company," "we," "us," or "our") collects, uses, and discloses information about you when you use our website, mobile applications, and other online products and services (collectively, the "Services").
        </p>
        <p class="mb-4">
          By accessing or using our Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree, please do not use our Services.
        </p>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">2. Information We Collect</h3>
        <p class="mb-4">We may collect various types of information about you, including:</p>
        <h4 class="text-lg font-semibold mb-2">A. Personal Information You Provide:</h4>
        <p class="mb-4">
          We collect information you directly provide to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, mailing address, payment information, and any other information you choose to provide.
        </p>
        <h4 class="text-lg font-semibold mb-2">B. Information We Collect Automatically:</h4>
        <p class="mb-4">
          When you access or use our Services, we automatically collect certain information about your device and activity. This may include:
        </p>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li><strong>Log Data:</strong> Information such as your IP address, browser type, operating system, pages you visit, and the time and date of your visit.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our Services, such as the features you use, the content you view, and the links you click.</li>
          <li><strong>Device Information:</strong> Information about the device you use to access our Services, including the device type, unique device identifiers, and mobile network information.</li>
          <li><strong>Cookies and Other Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to collect information, remember your preferences, and enhance your user experience. You can manage your cookie preferences through your browser settings.</li>
        </ul>
        <h4 class="text-lg font-semibold mb-2">C. Information from Third Parties:</h4>
        <p class="mb-4">
          We may receive information about you from third-party sources, such as social media platforms, analytics providers, and business partners. For example, if you log in to our Services using a social media account, we may receive information from that platform.
        </p>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">3. How We Use Your Information</h3>
        <p class="mb-4">We use the information we collect for various purposes, including to:</p>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li>Provide, maintain, and improve our Services.</li>
          <li>Process your transactions and send you related information, including confirmations and invoices.</li>
          <li>Communicate with you, respond to your requests, and provide customer support.</li>
          <li>Personalize and enhance your experience on our Services.</li>
          <li>Send you marketing and promotional communications, and other information that may be of interest to you. You can opt out of receiving these communications at any time.</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our Services.</li>
          <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
          <li>Comply with our legal obligations.</li>
        </ul>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">4. How We Disclose Your Information</h3>
        <p class="mb-4">We may disclose your information to third parties in the following circumstances:</p>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li><strong>With Your Consent:</strong> We may share your information with your consent or at your direction.</li>
          <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting, and customer service.</li>
          <li><strong>Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company, we may share your information.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if we believe it is necessary to comply with a legal obligation, such as a subpoena or court order, or to protect the rights, property, or safety of our Company, our users, or others.</li>
          <li><strong>Affiliates:</strong> We may share your information with our affiliates and related companies for business and operational purposes.</li>
          <li><strong>Aggregated or De-identified Data:</strong> We may share aggregated or de-identified information that cannot reasonably be used to identify you.</li>
        </ul>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">5. Your Choices</h3>
        <p class="mb-4">You have certain choices regarding your information:</p>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li><strong>Account Information:</strong> You can review and update your account information at any time by logging into your account.</li>
          <li><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can usually change your browser settings to remove or reject cookies. However, please note that doing so may affect the functionality of our Services.</li>
          <li><strong>Promotional Communications:</strong> You can opt out of receiving promotional emails from us by following the unsubscribe instructions provided in those emails. Even if you opt out, we may still send you non-promotional communications, such as those about your account or our business relationship.</li>
        </ul>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">6. Data Security</h3>
        <p class="mb-4">
          We take reasonable measures to protect your information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no data transmission or storage system can be guaranteed to be 100% secure.
        </p>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">7. Children's Privacy</h3>
        <p class="mb-4">
          Our Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information.
        </p>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">8. International Data Transfers</h3>
        <p class="mb-4">
          Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws than your country. By using our Services, you consent to the transfer of your information to these countries.
        </p>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">9. Changes to This Privacy Policy</h3>
        <p class="mb-4">
          We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting the new policy on our website and updating the "Last Updated" date at the top of this policy. We encourage you to review this policy periodically.
        </p>
        <hr class="mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-amber-300">10. Contact Us</h3>
        <p class="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
        <p class="mb-4"><strong>Company:</strong> www.sherinyosry.com</p>
        <p class="mb-4"><strong>Address:</strong>
          FOAM1604 Compass Building, Al Shohada Road
          AL Hamra Industrial Zone-FZ
          Ras Al Khaimah, United Arab Emirates
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Add any specific styles for the modal here if needed */
</style>
