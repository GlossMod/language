import { createI18n } from 'vue-i18n'

const modules = import.meta.glob('./*', { eager: true })

function getLangAll(): any {
    // let message: any = {}
    let message = getLangFiles(modules)
    //   getLangFiles(viewModules,message)
    return message
}

/**
 * 获取所有语言文件
 * @param {Object} mList
 */
function getLangFiles(mList: any) {
    let msg: any = {}
    for (let path in mList) {
        if (mList[path].default) {
            //  获取文件名
            let pathName = path.replace(/(\.\/|\.ts)/g, '')

            if (msg[pathName]) {
                msg[pathName] = {
                    ...mList[pathName],
                    ...mList[path].default
                }
            } else {
                msg[pathName] = mList[path].default
            }

        }
    }
    return msg
}

const i18n = createI18n({
    legacy: false, // 使用Composition API，这里必须设置为false
    globalInjection: true,
    global: true,
    locale: 'zh-CN',
    fallbackLocale: 'zh-CN', // 默认语言
    messages: getLangAll()
});


export default i18n;