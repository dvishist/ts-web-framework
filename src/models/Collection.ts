import { Eventing } from './Eventing'
import { User, UserProps } from './User'
import axios, { AxiosResponse } from 'axios'

export class Collection<T, U> {
	public models: T[] = []
	public events: Eventing = new Eventing()

	constructor(public url: string, public deserialize: (props: U) => T) {}

	on = this.events.on
	trigger = this.events.trigger

	fetch(): void {
		axios.get(this.url).then((response: AxiosResponse) => {
			response.data.forEach((value: U) => {
				this.models.push(this.deserialize(value))
			})
		})

		this.trigger('change')
	}
}
