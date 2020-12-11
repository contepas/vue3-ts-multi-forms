<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link :to="{name: 'Forms'}">Forms</router-link>
    </div>
    <router-view />
</template>

<style lang="scss">
@import './style/global.scss';
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
    padding: 30px;
    text-align: center;
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

label {
    margin: 0 auto 5px 8px;
    display: block;
    font-weight: bold;
    color: $secondary-color;
}
</style>
