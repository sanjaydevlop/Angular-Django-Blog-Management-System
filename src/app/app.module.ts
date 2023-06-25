import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar'; // Add this import
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MyhomeComponent } from './myhome/myhome.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BarGraphComponent,
    PostsComponent,
    ReactiveFormComponent,
    SearchComponent,
    SearchResultsComponent,
    LoginComponent,
    SingupComponent,
    MyhomeComponent,
    ProfileComponent
  ],
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    RouterModule.forRoot([
      // { path: '', canActivate:[AuthGuard],component: HomeComponent},
      { path: 'about', canActivate:[AuthGuard],component: AboutComponent },
      { path: 'contact', canActivate:[AuthGuard],component: ContactComponent },
      { path: 'form',canActivate:[AuthGuard], component: ReactiveFormComponent},
      { path: 'search-results/:searchTerm',component: SearchResultsComponent },
      { path: 'bar-graph',canActivate:[AuthGuard], component: BarGraphComponent },
      { path: 'search',canActivate:[AuthGuard], component: SearchComponent },
      { path: 'signup', component: SingupComponent },
      { path: 'login', component: LoginComponent },
      {path:'home',component:HomeComponent},
      {path:'myhome',component:MyhomeComponent},
      {path:'profile',component:ProfileComponent},
      { path: '', component: MyhomeComponent}

      
    ]),
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
