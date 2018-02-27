<template>
    <div class="notification">
        {{ body }}
        <h1>{{message}}</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                body: 'I am a notification.',
                message:'おk'
            }
        }
    }
</script>

<style>
    .notification {
        background: red;
    }
</style>