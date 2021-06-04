<template>
     <option :value="category.id">{{ category.name }}</option>
</template>

<script>
export default {
     props: ['category']
}
</script>