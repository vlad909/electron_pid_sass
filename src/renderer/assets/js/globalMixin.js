export const actions = {
    methods: {
        limiterByWidth(count, what = 'px'){
            return {width: count + what}
        }
    }
}