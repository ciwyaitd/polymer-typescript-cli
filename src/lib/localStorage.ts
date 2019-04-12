const _localStorage = window.localStorage

export class Storage {
    constructor(private _preKey = '_polymer:') {}

    private getFullKey(key = '') {
        return this._preKey + key
    }

    public get<T>(key: string, defaultVal): T {
        const data = _localStorage.getItem(this.getFullKey(key))
        if (!data) {
            return defaultVal
        }
        try {
            return JSON.parse(data)
        } catch (error) {
            console.log(error)
        }
        return defaultVal
    }

    public set<T>(key: string, val: Types.PlainObject) {
        let data = JSON.stringify(val)
        return _localStorage.setItem(this.getFullKey(key), data)
    }

    public remove(key: string) {
        _localStorage.removeItem(this.getFullKey(key))
    }

    /**
     * 取所有 key
     */
    public keys() {
        let keys: string[] = []
        for (let index = 0; index < _localStorage.length; index++) {
            const key = _localStorage.key(index) || ''
            if (key.indexOf(this._preKey) === 0) {
                keys.push(key)
            }
        }
        return keys
    }

    public clear() {
        this.keys().forEach(k => this.remove(k))
    }
}

const storage = new Storage()
export default storage
