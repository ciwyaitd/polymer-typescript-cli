/**
 * ListFooter
 * @author "ejinmin" <b84866466@gmail.com>
 * @date 2019-04-07 16-00-04
 * @since 0.0.1
 */

'use strict'

import { PolymerElement } from '@polymer/polymer'
import { customElement, property, computed } from '@polymer/decorators'
import html from 'utils/html'
import view from './template.html'
import { TodosFilter } from 'common/constants'
import store from 'store'
import { clearCompleted } from 'store/actions'

@customElement('list-footer')
export default class ListFooter extends store(PolymerElement) {
    constructor() {
        super()
    }

    @property({ type: String })
    public filter = TodosFilter.All

    @property({ type: Object })
    private filters = Object.keys(TodosFilter)

    @property({ type: Array, statePath: 'todos' })
    public todos!: Types.TodoItem[]

    private setFilter(e: MouseEvent) {
        const filter = (e.target as HTMLLinkElement).getAttribute(
            'data-filter'
        ) as string
        this.dispatchEvent(
            new CustomEvent('set-filter', {
                bubbles: true,
                composed: true,
                detail: {
                    value: filter
                }
            })
        )
        this.filter = filter
    }

    private clearCompleted() {
        this.dispatch(clearCompleted())
    }

    @computed('filter')
    public get isSelected() {
        return (item: string) => (item === this.filter ? 'selected' : '')
    }

    @computed('todos')
    public get itemsLeft() {
        return this.todos.filter(v => !v.completed).length
    }

    static get template() {
        return html(view)
    }
}
