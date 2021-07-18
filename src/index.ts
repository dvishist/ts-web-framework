import { UserList } from './views/UserList'
import { Collection } from './models/Collection'
import { User, UserProps } from './models/User'

const url = 'http://localhost:3000/users'

const collection = new Collection(url, (props: UserProps) => User.build(props))

collection.on('change', () => {
	const root = document.getElementById('root')
	if (root) {
		new UserList(root, collection).render()
	}
})

collection.fetch()
console.log(collection)
