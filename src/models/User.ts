import axios from 'axios'
import { Attributes } from './Attributes'
import { Eventing } from './Eventing'
import { Sync } from './Sync'

export interface UserProps {
	id?: number
	name?: string
	age?: number
}

const url = 'https://localhost:3000/users'

export class User {
	public events: Eventing = new Eventing()
	public sync: Sync<UserProps> = new Sync<UserProps>(url)
	public attributes: Attributes<UserProps>

	constructor(props: UserProps) {
		this.attributes = new Attributes<UserProps>(props)
	}

	get get() {
		return this.attributes.get
	}

	get on() {
		return this.events.on
	}

	get trigger() {
		return this.events.trigger
	}
}
