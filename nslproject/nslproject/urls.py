
from django.contrib import admin
from django.urls import path
from nslapp import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', views.signup, name='signup'),
    path('create',views.create_object,name='blog'),
    path('delete/<str:pk>',views.delete),
    path('getAll',views.getAllBlogs),
    path('getBlogs/<str:name>',views.getAllF),
    path('comment',views.comment),
    path('getComment/<str:blogid>',views.getComment),
]
