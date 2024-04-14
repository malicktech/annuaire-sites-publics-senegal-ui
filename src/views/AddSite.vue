<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        label="Nom du site"
        v-model="site.name"
        :rules="[(v) => !!v || 'Le nom est requis']"
        required
      ></v-text-field>

      <v-text-field
        label="URL du site"
        v-model="site.url"
        :rules="[
          (v) => !!v || 'L\'URL est requise',
          (v) => /.+\..+/.test(v) || 'URL doit être valide'
        ]"
        required
      ></v-text-field>

      <v-select
        label="Type de site"
        :items="['Plate-forme', 'Agence', 'Administration', 'Portail']"
        v-model="site.type"
        :rules="[(v) => !!v || 'Le type est requis']"
        required
      ></v-select>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
        Ajouter le site
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'

export default {
  setup() {
    const form = ref(null)
    const valid = ref(false)
    const site = reactive({
      name: '',
      url: '',
      type: ''
    })

    const submit = () => {
      if (form.value.validate()) {
        console.log('Form Submitted', site)
        // FIXME: ici intégrer la logique pour sauvegarder les données
      }
    }

    return { form, valid, site, submit }
  }
}
</script>
