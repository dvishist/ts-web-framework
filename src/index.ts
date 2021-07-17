import { User } from './models/User'
import axios from 'axios'

const user = new User({
	name: 'New Name',
	age: 233
})

user.save()

console.log(user)
