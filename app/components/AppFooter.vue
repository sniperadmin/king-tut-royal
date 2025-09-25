<template>
  <v-footer>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="4" class="text-center text-md-left">
          <div class="text-h6 text-primary">King Tut Royal</div>
          <p class="text-body-2">Experience the timeless wonders of ancient Egypt with exclusive VIP access, luxury accommodations, and unforgettable cultural encounters. Heritage, luxury, and technology combined.</p>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <!-- <v-btn icon class="mx-2"><v-icon>mdi-facebook</v-icon></v-btn>
          <v-btn icon class="mx-2"><v-icon>mdi-twitter</v-icon></v-btn> -->
          <v-btn icon class="mx-2" href="https://www.instagram.com/sherinyosry/" target="_blank"><v-icon>mdi-instagram</v-icon></v-btn>
        </v-col>
        <v-col cols="12" md="4" class="text-center text-md-right">
          <div class="text-center">
            <div class="text-h6 text-primary font-weight-medium">Contact Info</div>
            <div class="text-subtitle-1">SY Consulting FZ-LLC</div>
            <p class="text-body-2">
              <v-icon color="primary" size="small" class="me-2">mdi-map-marker</v-icon>
              FOAM1604 Compass Building, Al Shohada Road<br>
              AL Hamra Industrial Zone-FZ<br>
              Ras Al Khaimah, United Arab Emirates
            </p>
            <div class="d-flex flex-column">
              <p href="https://wa.me/201270389777" class="text-decoration-none">
                <v-icon color="primary" size="small" class="me-2">mdi-whatsapp</v-icon>
                +201270389777
              </p>
              <a href="https://www.sherinyosry.com" target="_blank" class="text-decoration-none">
                <v-icon color="primary" size="small" class="me-2">mdi-web</v-icon>
                www.sherinyosry.com
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="mt-3 text-center">
        <p class="text-body-2">&copy; {{ new Date().getFullYear() }} King Tut Royal. All rights reserved. | SY Consulting FZ-LLC</p>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
// No script needed for a basic footer
</script>

<style scoped>
/* Add any footer-specific styles here */
</style>