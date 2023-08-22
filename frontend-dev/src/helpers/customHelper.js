import dayjs from "dayjs";

export const getValueFromMdObject = (obj, prop) => {
    if (typeof obj !== 'object') throw 'getProp: obj is not an object'
    if (typeof prop !== 'string') throw 'getProp: prop is not a string'

    // Replace [] notation with dot notation
    prop = prop.replace(/\[["'`](.*)["'`]\]/g,".$1")

    return prop.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined
    }, obj)
}

export const formatDate = (dateObj) => {
    return dayjs(dateObj).format('YYYY-MM-DD')
}