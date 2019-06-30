/**
 * InputBox
 * @author "ejinmin" <b84866466@gmail.com>
 * @date 2019-04-06 22-10-11
 * @since 0.0.1
 */

'use strict'

import { PolymerElement } from '@polymer/polymer/polymer-element'
import { customElement, property, computed } from '@polymer/decorators'
import html from 'utils/html'
import view from './template.html'
import store from 'store'
import { toggleAllTodo } from 'store/actions'

@customElement('input-box')
export default class InputBox extends store(PolymerElement) {
    constructor() {
        super()
    }

    @property({ type: String })
    private text = ''

    private toggleStatus(e: HTMLElementEventMap['change']) {
        this.dispatch(toggleAllTodo())
    }

    @property({ type: Array, statePath: 'todos' })
    public todos

    @computed('todos')
    public get showToggleButton() {
        return this.todos && this.todos.length > 0
    }

    private KeydownHandler(e: KeyboardEvent) {
        if (e.keyCode !== 13) return
        if (!this.text) return
        this.dispatchEvent(
            new CustomEvent('add-todo', {
                bubbles: true,
                composed: true,
                detail: {
                    value: this.text
                }
            })
        )
        this.text = ''
    }

    static get template() {
        return html(view)
    }
}
