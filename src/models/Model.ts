import { AxiosPromise, AxiosResponse } from 'axios'

interface IAttributes<T> {
	get<K extends keyof T>(key: K): T[K]
	set(value: T): void
	getAll(): T
}

interface ISync<T> {
	fetch(id: number): AxiosPromise
	save(data: T): AxiosPromise
}

interface IEvents {
	on(eventName: string, callback: () => void): void
	trigger(eventName: string): void
}

interface hasId {
	id?: number
}

export class Model<T extends hasId> {
	constructor(
		private attributes: IAttributes<T>,
		private events: IEvents,
		private sync: ISync<T>
	) {}

	get get() {
		return this.attributes.get
	}

	get on() {
		return this.events.on
	}

	get trigger() {
		return this.events.trigger
	}

	set(update: T) {
		this.attributes.set(update)
		this.events.trigger('change')
	}

	fetch(): void {
		const id = this.get('id')

		if (!id) throw new Error('Cannot fetch without an id')

		this.sync.fetch(id).then((response: AxiosResponse) => {
			this.set(response.data)
		})
	}

	save(): void {
		const atts = this.attributes.getAll()
		this.sync.save(atts).then((response: AxiosResponse) => {
			this.trigger('save')
		})
	}
}
