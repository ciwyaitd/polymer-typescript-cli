export as namespace Types

export interface PlainObject {
    [key: string]: any
}

export interface TodoItem {
    id?: number
    title: string
    completed: boolean
}
