from django.db import models

class Signup(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=100)

class Blog(models.Model):
    nameb=models.TextField()
    aname=models.TextField()
    blog=models.TextField()

class Comment(models.Model):
    cname=models.TextField(default='Karthika')
    comment=models.TextField()
    blog=models.ForeignKey(Blog,on_delete=models.CASCADE)

