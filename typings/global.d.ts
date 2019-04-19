declare module '@polymer/polymer/polymer-element' {
    import { PolymerInit } from '@polymer/polymer/interfaces.d'
    export class PolymerElement extends HTMLElement {}
}

declare module '*.html' {
    const template: string
    export default template
}

declare module 'polymer-redux' {
    import { Store, Dispatch } from 'redux'
    import { PolymerElement } from '@polymer/polymer/polymer-element.d'
    import { ElementConstructor } from '@polymer/decorators/lib/decorators.d'

    interface PolymerRedux<S> {
        <T>(parent: T): (new () => PolymerElement & {
            getState: () => S
            dispatch: Dispatch
        }) &
            ElementConstructor
    }

    export default function PolymerRedux<S>(store: Store): PolymerRedux<S>
}

interface Function {
    is?: string
}
