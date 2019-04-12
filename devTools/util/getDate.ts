/**
 * date
 */

function fillZero(num) {
    if (num < 10) {
        return '0' + num
    }

    return num
}

function dateFormat(dateObj: Date) {
    const year = dateObj.getFullYear()
    const month = fillZero(dateObj.getMonth() + 1)
    const date = fillZero(dateObj.getDate())
    const hour = fillZero(dateObj.getHours())
    const min = fillZero(dateObj.getMinutes())
    const sec = fillZero(dateObj.getSeconds())

    return `${year}-${month}-${date} ${hour}-${min}-${sec}`
}

export default function() {
    return dateFormat(new Date())
}
