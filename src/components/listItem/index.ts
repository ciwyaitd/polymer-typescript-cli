/**
 * ListItem
 * @author "ejinmin" <b84866466@gmail.com>
 * @date 2019-04-07 17-24-03
 * @since 0.0.1
 */

'use strict'

import { PolymerElement } from '@polymer/polymer/polymer-element'
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status'
import {
    customElement,
    property,
    computed,
    observe
} from '@polymer/decorators/lib/decorators'
import html from 'utils/html'
import view from './template.html'
import store from 'store'
import { deleteTodo, editTodo, toggleTodo } from 'store/actions'

@customElement('list-item')
export default class ListItem extends store(PolymerElement) {
    constructor() {
        super()
    }

    public ready() {
        super.ready()

        afterNextRender(this, () => {
            this.text = this.item.title
        })
    }

    @property({ type: Object })
    private item!: Types.TodoItem

    @property({ type: String })
    private text = ''

    @property({ type: Boolean })
    public isEditing = false

    private dbclickHandler() {
        this.isEditing = true
        ;(this.$['list-item-input'] as HTMLDivElement).focus()
    }

    private blurHandler() {
        this.isEditing = false
        this.dispatch(editTodo(this.item, this.text))
    }

    private delete() {
        this.dispatch(deleteTodo(this.item))
    }

    private keydownHandler(e: KeyboardEvent) {
        if (e.keyCode === 27) {
            this.text = this.item.title
            ;(this.$['list-item-input'] as HTMLInputElement).blur()
            return
        }
        if (e.keyCode !== 13) return
        ;(this.$['list-item-input'] as HTMLInputElement).blur()
    }

    private toggle(e: Event) {
        this.dispatch(
            toggleTodo({
                ...this.item
            })
        )
    }

    @computed('isEditing')
    public get className() {
        return this.isEditing ? 'editing' : ''
    }

    @observe('item.title')
    private titleWatcher(title: string) {
        this.text = title
    }

    static get template() {
        return html(view)
    }
}
