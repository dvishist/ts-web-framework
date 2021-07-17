import { Eventing } from './Eventing'
import { User, UserProps } from './User'
import axios, { AxiosResponse } from 'axios'

export class Collection {
	constructor(
		public url: string,
		public models: User[] = [],
		public events: Eventing = new Eventing()
	) {}

	on = this.events.on
	trigger = this.events.trigger

	fetch(): void {
		axios.get(this.url).then((response: AxiosResponse) => {
			response.data.forEach((value: UserProps) => {
				const user = User.build(value)
				this.models.push(user)
			})
		})
	}
}
