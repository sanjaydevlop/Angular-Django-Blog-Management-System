// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-posts',
//   templateUrl: './posts.component.html',
//   styleUrls: ['./posts.component.css']
// })
// export class PostsComponent implements OnInit {
//   posts$: Observable<any[]>;

//   constructor(private http: HttpClient) {
//     this.posts$ = new Observable<any[]>();
//   }

//   ngOnInit() {
//     this.fetchPosts();
//   }

//   fetchPosts() {
//     this.posts$ = this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
//   }
// }



import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  postForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.posts = [];
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        this.posts = data;
      });
  }

  createPost() {
    if (this.postForm.invalid) {
      return;
    }

    const newPost = this.postForm.value;
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', newPost)
      .subscribe((data) => {
        this.posts.unshift(data);
        this.postForm.reset();
      });
  }

  deletePost(postId: number) {
    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
      });
  }
}

