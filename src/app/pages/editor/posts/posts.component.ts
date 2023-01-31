import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BlogPost, TableData, Table } from './../../../lib/types.interface';
import { PostService } from './../../../services/blog/post.service';
import { ModalService } from './../../modal/modal.service';
import { PostFormComponent as FormComponentType, PostFormComponent } from './form/post-form.component';


@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styles: []
})
export class PostsComponent implements OnInit {

	public payload: Table<BlogPost> = { cols: [{ title: 'Post Title' }], data: [] };

	public constructor(
		private postService: PostService,
		private modalService: ModalService<PostFormComponent, BlogPost>,
	) { }

	ngOnInit(): void {
		this.setEditorPosts();
	}

	public onOpenModal = async (): Promise<void> => {
		await this.modalService.open({
			component: PostFormComponent,
			modalTitle: 'Create Post'
		});
	}

	private async setEditorPosts(): Promise<void> {
		const response = await firstValueFrom(this.postService.posts$!);
		response.forEach(post => this.payload.data.push(this.toTableData(post)))
		this.payload.action = { onEdit: this.onEditPost, onRemove: this.onRemovePost }
	}

	private toTableData(post: BlogPost): TableData<BlogPost> {
		return { id: post._id!, title: post.title, date: new Date(post.date).toDateString(), };
	}

	private onEditPost = (id: string, data?: BlogPost): void => {
		console.log('editing post with id: ', id);
	}

	private onRemovePost = (id: string): void => {
		console.log('removing post with id: ', id);
	}

}
