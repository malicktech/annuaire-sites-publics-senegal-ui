<template>
  <div>
    <v-text-field
      v-model="searchQuery"
      label="Rechercher par nom"
      outlined
      class="mb-4"
    ></v-text-field>
    <v-select
      :items="typeOptions"
      label="Filtrer par type"
      v-model="selectedType"
      clearable
    ></v-select>
    <v-data-table :items="filteredSites" class="elevation-1">
      <template v-slot:item.url="{ item }">
        <a :href="item.url" target="_blank">{{ item.url }}</a>
      </template>
      <template v-slot:item.type="{ item }">
        <v-chip :color="getColor(item.type)" dark>{{ item.type }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import Papa from 'papaparse'

export default {
  setup() {
    const sites = ref([])
    const searchQuery = ref('')
    const selectedType = ref(null)
    const headers = ref([
      { text: 'Nom', value: 'nom' },
      { text: 'URL', value: 'url', sortable: false },
      { text: 'Type', value: 'type' }
    ])
    const typeOptions = ['Plate-forme', 'Agence', 'Administration', 'Portail']

    const filteredSites = computed(() => {
      return sites.value.filter((site) => {
        return (
          (!selectedType.value || site.type === selectedType.value) &&
          site.nom.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      })
    })

    function getColor(type) {
      switch (type) {
        case 'Portail':
          return 'secondary'
        case 'Plate-forme':
          return 'green'
        case 'Agence':
          return 'deep-purple-accent-4'
        case 'Administration':
          return 'purple'
        default:
          return 'grey'
      }
    }

    // Load CSV data
    onMounted(() => {
      fetch('/annuaire.csv')
        .then((response) => response.text())
        .then((csv) => {
          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              sites.value = results.data
            }
          })
        })
    })

    return { headers, filteredSites, typeOptions, selectedType, getColor, searchQuery }
  }
}
</script>
