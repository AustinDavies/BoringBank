<template>
  <v-app dark>

    <v-container fill-height>
      <v-layout justify-center
                align-center>
        <v-flex shrink>
          <v-card v-if="isNetworkError"
                  color="transparent"
                  flat
                  tile>
            <v-card-text class="text-center">
              <v-icon size="6rem">mdi-lan-disconnect</v-icon>
              <h1 class="mt-5">Network Error</h1>
              <p class="subheading">Please ensure the API is running and that you are connected to a network.</p>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn href="/"
                     color="primary">Try reconnecting</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <h1 v-if="error.statusCode === 404">
              {{ pageNotFound }}
            </h1>
            <h1 v-else>
              {{ otherError }}
            </h1>
            <v-card-actions>
              <v-btn href="/"
                     color="primary">Return Home</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    isNetworkError: function() {
      return (
        this.error.isAxiosError &&
        this.error.message &&
        this.error.message.toLowerCase().includes('network error')
      );
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
