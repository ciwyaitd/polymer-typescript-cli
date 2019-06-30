import reset from './reset'

const styles = [reset]

styles.forEach(style => {
    style.setAttribute('style', 'display: none')
    document.head.appendChild(style.content)
})
