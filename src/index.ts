import { User } from './models/User'

const user = new User({
	name: 'New Name',
	age: 233
})

console.log(user.get('name'))
console.log(user)
