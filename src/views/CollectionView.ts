import { Collection } from '../models/Collection'

export abstract class CollectionView<T, U> {
	constructor(public parent: Element, public collection: Collection<T, U>) {}

	render(): void {
		this.parent.innerHTML = ''
		const templateElement = document.createElement('template')
		this.collection.models.forEach(model => {
			const wrapper = document.createElement('div')
			this.renderItem(model, wrapper)
			templateElement.content.append(wrapper)
		})
		this.parent.append(templateElement.content)
	}

	abstract renderItem(model: T, parent: Element): void
}
