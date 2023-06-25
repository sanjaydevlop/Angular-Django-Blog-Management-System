from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.decorators import api_view
from .serializers import BlogSerializer,CommentSerializer,SignupSerializer

from .models import Blog,Signup,Comment
from rest_framework.response import Response
from django.utils.text import slugify

from rest_framework import status

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            user = User.objects.create_user(
                username=data['fname'],
                first_name=data['fname'],
                last_name=data['lname'],
                email=data['email'],
                password=data['password'],
                phone=data['phone']
            )
            return JsonResponse({'message': 'User created successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@api_view(['POST'])
def create_object(request):
    print(request.data)
    serializer = BlogSerializer(data=request.data)
    
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete(request, pk):
    try:
        obj = Blog.objects.get(id=pk)
    except Blog.DoesNotExist:
        return Response(status=404)
    obj.delete()
    return Response(status=204)


@api_view(['GET'])
def getAllBlogs(request):
    blogs=Blog.objects.all()
    serializer=BlogSerializer(blogs,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getAllF(request,name):
    blogsname=Blog.objects.filter(nameb=name)
    serializer=BlogSerializer(blogsname,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def comment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getComment(request,blogid):
    comments=Comment.objects.filter(blog=blogid)
    serializer=CommentSerializer(comments,many=True)
    return Response(serializer.data)

