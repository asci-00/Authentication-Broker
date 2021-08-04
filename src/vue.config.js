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
    pages : {
        index : { title: 'Authentication Broker', }
    }
}