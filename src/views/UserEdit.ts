import { View } from './View'
import { User, UserProps } from '../models/User'
import { UserForm } from './UserForm'
import { UserShow } from './UserShow'

export class UserEdit extends View<User, UserProps> {
	childrenMap(): { [key: string]: string } {
		return {
			userShow: '.user-show',
			userForm: '.user-form'
		}
	}

	renderChildren(): void {
		new UserShow(this.children.userShow, this.model).render()
		new UserForm(this.children.userForm, this.model).render()
	}

	template(): string {
		return `
            <div>
                <div class="user-show">

                </div>
                <div class="user-form">
                
                </div>
            </div>
        `
	}
}
