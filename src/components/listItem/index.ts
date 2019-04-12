/**
 * ListItem
 * @author "ejinmin" <b84866466@gmail.com>
 * @date 2019-04-07 17-24-03
 * @since 0.0.1
 */

'use strict'

import { PolymerElement } from '@polymer/polymer'
import { customElement, property } from '@polymer/decorators'
import html from 'utils/html'
import view from './template.html'

@customElement('list-item')
export default class ListItem extends PolymerElement {
    constructor() {
        super()
    }

    static get template() {
        return html(view)
    }
}

