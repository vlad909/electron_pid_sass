<template>
    <div class="login-container">
        <div class="login-form">
            <form>
                <div class="form-group">
                    <label for="login">Username</label>
                    <input type="text" class="form-control" id="login"
                           placeholder="Enter your username">
                </div>
                <div class="form-group">
                    <label for="pass">Password</label>
                    <input type="password" class="form-control" id="pass"
                           placeholder="Enter password">
                </div>
                <button type="button" class="btn btn-success btn-login m-t-10">Login</button>
            </form>
        </div>
    </div>
</template>
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
            height: 250px;
            display: flex;
            align-items: center;
            flex-direction: column;
            background-color: white;
            border-radius: 10px;
            padding: 15px;
            .btn-login {
                width: 261px;
            }
        }
    }
</style>