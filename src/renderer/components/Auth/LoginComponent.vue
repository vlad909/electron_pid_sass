<template>
    <div class="login-container">
        <div class="login-form">
            <form>
                <div class="form-group">
                    <label for="login">Username</label>
                    <input type="text" class="form-control" id="login"
                           placeholder="Enter your username" v-model="username">
                </div>
                <div class="form-group">
                    <label for="pass">Password</label>
                    <input type="password" class="form-control" id="pass"
                           placeholder="Enter password" v-model="password">
                </div>
                <p v-if="error" class="m-t-10 text-center" style="color: red;">Incorrect login and/or password</p>
                <button @click="login" type="button" class="btn btn-success btn-login m-t-10"
                        :disabled="!username || !password">Login
                </button>
            </form>
            <!--<transition name="moving">-->
                <!--<div class="alert-container catch" v-if="bla">-->
                    <!--<p style="text-align: center">ggfgggggggggggggggggfgdggd</p>-->
                <!--</div>-->
            <!--</transition>-->
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: 'admin',
                password: 'admin',
                error: false,
                bla: false
            }
        },
        methods: {
            login() { //clean fake
                if (this.username === 'admin' && this.password === 'admin') {
                    this.$router.push({
                        name: 'general'
                    })
                } else {
                    this.error = true
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        min-height: 100vh;
        background-image: url(~@/assets/bg-01.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .login-form {
            width: 400px;
            min-height: 250px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            background-color: white;
            border-radius: 10px;
            padding: 15px;
            .btn-login {
                width: 261px;
            }
            /*transition animation  */
            .moving-enter-active, .moving .moving-leave-active {
                transition: right .5s;
            }
            .moving-enter, .moving-leave-to {
                right: -140px;
            }

        }
    }
</style>