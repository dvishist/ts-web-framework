import axios from 'axios'
import { Eventing } from './Eventing'

interface UserProps {
	id?: number
	name?: string
	age?: number
}

export class User {
	constructor(private data: UserProps, public events: Eventing = new Eventing()) {}

	fetch(): void {
		const id = this.get('id')
		axios.get(`${URL}/users/${id}`).then(response => {
			this.set(response.data)
		})
	}

	save(): void {
		const id = this.get('id')
		if (id) {
			axios.put(`${URL}/users/${id}`, this.data)
		} else {
			axios.post(`${URL}/users`, this.data)
		}
	}

	get<K extends keyof UserProps>(propName: K): string | number | void {
		return this.data[propName as keyof UserProps]
	}

	set(update: UserProps): void {
		Object.assign(this.data, update)
	}
}
