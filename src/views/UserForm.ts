import { User, UserProps } from '../models/User'
import { View } from './View'

export class UserForm extends View<User, UserProps> {
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:.set-age': this.setRandomAge,
			'click:.set-name': this.setName,
			'click:.save-model': this.saveModel
		}
	}

	setRandomAge = (): void => {
		this.model.setRandomAge()
	}

	setName = (): void => {
		const input = this.parent.querySelector('input')!
		const name = input.value
		this.model.set({ name })
	}

	saveModel = (): void => {
		this.model.save()
	}

	template(): string {
		return `
            <div>
                <h1>User Form</h1>
				<div>
					User Name: ${this.model.get('name')}
				</div>
				<div>
					User Age: ${this.model.get('age')}
				</div>
                <input placeholder="${this.model.get('name')}"/>
				<button class="set-name">Set Name</button>
				<button class="set-age">Set Random Age</button>
				<button class="save-model">Save User</button>
            </div>
        `
	}
}
