import { Collection } from './models/Collection'
import { User, UserProps } from './models/User'

const collection = User.buildCollection()

collection.on('change', () => {
	console.log(collection)
})

collection.fetch()
