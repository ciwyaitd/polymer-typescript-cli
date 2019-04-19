/**
 * InputBox
 * @author "ejinmin" <b84866466@gmail.com>
 * @date 2019-04-06 22-10-11
 * @since 0.0.1
 */

'use strict'

import { PolymerElement } from '@polymer/polymer'
import { customElement, property, computed } from '@polymer/decorators'
import html from 'utils/html'
import view from './template.html'
import store from 'store'

@customElement('input-box')
export default class InputBox extends PolymerElement {
    // public store = todoStore

    constructor() {
        super()
    }

    // @property({ type: String })
    // private text = ''

    // @computed('store')
    // public get status() {
    //     return this.store.allStatus
    // }

    // @computed('store')
    // public get todos() {
    //     return this.store.todos
    // }

    // private toggleStatus(e: HTMLElementEventMap['change']) {
    //     this.store.toggleAllStatus((e.target as HTMLInputElement).checked)
    // }

    // private showToggleButton() {
    //     return this.todos.length > 0
    // }

    // private keyDown(e: HTMLElementEventMap['keydown']) {
    //     if (e.keyCode !== 13) return
    //     this.store.addTodos(this.text)
    //     this.text = ''
    // }

    static get template() {
        return html(view)
    }
}
