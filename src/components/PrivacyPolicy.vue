<template>
  <div v-if="isOpen" class="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
    <div class="bg-card p-8 rounded-lg shadow-lg max-w-4xl w-full text-foreground relative">
      <button @click="closeModal" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl">&times;</button>
      <h2 class="text-3xl font-bold mb-6 text-primary">Privacy & Refund Policy</h2>
      <div class="max-h-[70vh] overflow-y-auto pr-4">
        <p class="mb-4 text-muted-foreground">
          <strong>SY Consulting FZ-LLC</strong><br />
          Registered in the United Arab Emirates (UAE)<br />
          Office Address: [Insert Full Registered Address]<br />
          Operating under the trade name King Tut Royal<br />
          Website: <a href="https://www.kingtutroyal.com" class="text-primary hover:underline">www.kingtutroyal.com</a><br />
          Contact: <a href="mailto:info@kingtutroyal.com" class="text-primary hover:underline">info@kingtutroyal.com</a>
        </p>
        <hr class="mb-4 border-border" />
        <h2 class="text-2xl font-bold mb-4 text-primary">Privacy Policy</h2>
        <p class="mb-4 text-muted-foreground"><strong>Last Updated:</strong> August 24, 2023</p>
        <hr class="mb-4 border-border" />
        <h3 class="text-xl font-semibold mb-3 text-primary">Scope</h3>
        <p class="mb-4 text-muted-foreground">
          This Privacy Policy applies to all visitors and clients of
          <a href="https://www.kingtutroyal.com" class="text-primary hover:underline">www.kingtutroyal.com</a> (“the Site”), owned and operated by SY Consulting FZ-LLC, based in the United Arab Emirates. By using our Site, booking services, or otherwise interacting with us, you agree to the practices described in this Policy. If you do not agree, please do not use our Site or provide personal information.
        </p>
        <h3 class="text-xl font-semibold mb-3 text-primary">Information We Collect</h3>
        <p class="mb-4 text-muted-foreground">We may collect and process the following types of information:</p>
        <ul class="fancy-list text-lg text-muted-foreground text-left">
          <li v-for="(item, index) in informationCollected" :key="index">
            <Sparkles :size="16" class="lucide-icon" />
            <span v-html="item"></span>
          </li>
        </ul>
        <h3 class="text-xl font-semibold mb-3 text-primary">How We Collect Information</h3>
        <ol class="list-decimal list-inside mb-4 pl-4 text-muted-foreground">
          <li>
            <strong>Active Collection</strong> – When you voluntarily provide information by completing forms on our Site, subscribing to newsletters, booking packages, or contacting us.
          </li>
          <li>
            <strong>Passive Collection</strong> – Automatically collected data through cookies, IP addresses, and analytics tools.
          </li>
          <li>
            <strong>Other Channels</strong> – Information shared via phone calls, emails, in-person meetings, or through authorized travel agents acting on your behalf.
          </li>
        </ol>
        <h3 class="text-xl font-semibold mb-3 text-primary">Use of Information</h3>
        <p class="mb-4 text-muted-foreground">Your information may be used for:</p>
        <ul class="fancy-list text-lg text-muted-foreground text-left">
          <li v-for="(item, index) in useOfInformation" :key="index">
            <Sparkles :size="16" class="lucide-icon" />
            <span v-html="item"></span>
          </li>
        </ul>
        <h3 class="text-xl font-semibold mb-3 text-primary">Sharing of Information</h3>
        <ul class="fancy-list text-lg text-muted-foreground">
          <li v-for="(item, index) in sharingOfInformation" :key="index">
            <Sparkles :size="16" class="lucide-icon" />
            <span v-html="item"></span>
          </li>
        </ul>
        <h3 class="text-xl font-semibold mb-3 text-primary">Your Rights</h3>
        <p class="mb-4 text-muted-foreground">
          You may request to access, correct, or delete your personal data by contacting our Data Protection Officer at
          <a href="mailto:info@kingtutroyal.com" class="text-primary hover:underline">info@kingtutroyal.com</a>. We may require identity verification before processing such requests.
        </p>
        <h3 class="text-xl font-semibold mb-3 text-primary">Security</h3>
        <p class="mb-4 text-muted-foreground">
          While we implement reasonable safeguards, no online system can guarantee 100% security. You acknowledge that transmission of data over the internet is at your own risk.
        </p>
        <h3 class="text-xl font-semibold mb-3 text-primary">Children</h3>
        <p class="mb-4 text-muted-foreground">Our Site and services are not directed to children under 13. We do not knowingly collect data from children.</p>
        <h3 class="text-xl font-semibold mb-3 text-primary">Changes to This Policy</h3>
        <p class="mb-4 text-muted-foreground">
          We reserve the right to update this Policy to reflect legal or business changes. Updates will be posted on this page with a revised date.
        </p>
        <hr class="mb-4 border-border" />
        <h2 class="text-2xl font-bold mb-4 text-primary">Refund Policy</h2>
        <p class="mb-4 text-muted-foreground">
          At King Tut Royal, our luxury travel experiences are curated with third-party partners including airlines, hotels, venues, and event organizers. As such, our refund policy is as follows:
        </p>
        <ol class="list-decimal list-inside mb-4 pl-4 text-muted-foreground">
          <li>
            <strong>No Refunds</strong> – Once a booking is confirmed and payment has been made, no refunds will be issued. This applies to cancellations, no-shows, or changes initiated by the client.
          </li>
          <li>
            <strong>Force Majeure & Special Circumstances</strong> – In cases of force majeure (including but not limited to natural disasters, political unrest, pandemics, or governmental restrictions), or if clients face exceptional personal circumstances, bookings may be postponed to alternative available dates, subject to partner availability. Additional costs (if any) are borne by the client.
          </li>
          <li>
            <strong>Partner Policies</strong> – As all bookings involve third-party providers (airlines, hotels, event partners, etc.), their individual terms and conditions also apply. Clients agree to abide by these terms upon booking.
          </li>
          <li>
            <strong>Discretionary Support</strong> – While refunds are not permitted, SY Consulting FZ-LLC will make reasonable efforts to negotiate postponements or credits with service providers where possible, in the best interest of the client.
          </li>
        </ol>
        <hr class="mb-4 border-border" />
        <h3 class="text-xl font-semibold mb-3 text-primary">Contact Us</h3>
        <p class="mb-4 text-muted-foreground">For privacy or refund-related enquiries, please contact:</p>
        <p class="mb-4 text-muted-foreground">
          <strong>SY Consulting FZ-LLC</strong><br />
          Email: <a href="mailto:info@kingtutroyal.com" class="text-primary hover:underline">info@kingtutroyal.com</a><br />
          Website: <a href="https://www.kingtutroyal.com" class="text-primary hover:underline">www.kingtutroyal.com</a>
        </p>
        <hr class="mb-4 border-border" />
        <p class="mb-4 text-muted-foreground">
          ⚖️ This is now fully aligned with King Tut Royal, keeping the same legal protection structure.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next';
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);

const informationCollected = [
  '<strong>Personal information:</strong> full name, email address, phone number, billing address, passport or ID details (where required for travel), details of any group members you are travelling with, and preferences.',
  '<strong>Booking information:</strong> travel arrangements, accommodation details, special requirements (e.g., dietary or medical needs), and booking/payment confirmations.',
  '<strong>Communication data:</strong> any correspondence with us via email, telephone, social media, or in person.',
  '<strong>Technical information:</strong> IP addresses, browser type, operating system, browsing activity (through tools such as Google Analytics), and cookies (see our Cookies Policy).',
];

const useOfInformation = [
  'Processing enquiries, bookings, and payments.',
  'Sharing with third-party providers (e.g., hotels, airlines, tour operators) to fulfil your bookings.',
  'Sending you updates, offers, or marketing communications (where you have opted in or where a prior business relationship exists).',
  'Personalizing offers and recommendations.',
  'Improving our services, analytics, and internal market research.',
  'Compliance with applicable laws, regulations, or legal requests.',
];

const sharingOfInformation = [
  'We only share information with carefully selected service providers and third parties necessary to fulfil your travel arrangements.',
  'SY Consulting FZ-LLC is not responsible for the privacy practices of third parties (e.g., airlines, hotels, event organizers). We recommend reviewing their individual policies.',
  'We may share anonymized, aggregated data for research and marketing purposes.',
];

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.fancy-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.fancy-list li .lucide-icon {
  flex-shrink: 0;
  color: hsl(var(--primary));
}
</style>
