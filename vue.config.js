module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @import "@/assets/styles/common.scss";
                `
            }
        }
    },
    devServer: {
        host:'localhost'
    }
}