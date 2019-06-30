export default function html(template: string) {
    const element = document.createElement('template')
    element.innerHTML = template
    return element
}
