import { Model } from './Model'
import { Attributes } from './Attributes'
import { Sync } from './Sync'
import { Eventing } from './Eventing'

export interface UserProps {
	id?: number
	name?: string
	age?: number
}

const url = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
	static build(attributes: UserProps): User {
		return new User(
			new Attributes<UserProps>(attributes),
			new Eventing(),
			new Sync<UserProps>(url)
		)
	}
}
