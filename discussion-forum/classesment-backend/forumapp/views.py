# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from rest_framework import status

# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# from .serializers import TeacherSerializer, PostSerializer
# from .models import Teacher, Post

from django.http import Http404

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from forumapp.serializers import TeacherSerializer, PostSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Teacher, Post

class TeacherList(APIView):
    """
    List all teachers, or create a new teacher.
    """

    

    def get(self, request, format=None):
        teachers = Teacher.objects.all()
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        teacher = self.get_object(pk)
        teacher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TeacherDetail(APIView):
    """
    Retrieve, update or delete a teacher`  instance.
    """
    def get_object(self, pk):
        try:
            return Teacher.objects.get(_id=pk)
        except Teacher.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        teacher = self.get_object(pk)
        teacher = TeacherSerializer(teacher)
        return Response(teacher.data)

    def put(self, request, pk, format=None):
        teacher = self.get_object(pk)
        serializer = TeacherSerializer(teacher, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        teacher = self.get_object(pk)
        teacher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostList(APIView):
    """
    List all posts by teachers
    """
    def get(self, request, format=None):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            # post = Post(serializer.data)
            serializer.save()
            # post.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostDetail(APIView):
    """
    Retrieve, update or delete a post instance.
    """
    def get_object(self, pk):
        try:
            return Post.objects.get(id=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        post = PostSerializer(post)
        return Response(post.data)

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
# @api_view(['GET', 'POST'])
# def teacher_list(request):
#     if request.method == 'GET':
#         data = []
#         nextPage = 1
#         previousPage = 1
#         teachers = Teacher.objects.all()
#         print(teachers)
#         page = request.GET.get('page', 1)
#         paginator = Paginator(teachers, 10)

#         try:
#             data = paginator.page(page)
#         except PageNotAnInteger:
#             data = paginator.page(1)
#         except EmptyPage:
#             data = paginator.page(paginator.num_pages)

#         serializer = TeacherSerializer(data,context={'request': request} ,many=True)

#         if data.has_next():
#             nextPage = data.next_page_number()
#         if data.has_previous():
#             previousPage = data.previous_page_number()

#         return Response({'data': serializer.data , 
#                          'count': paginator.count, 
#                          'numpages' : paginator.num_pages, 
#                          'nextlink': '/api/teachers/?page=' + str(nextPage), 
#                          'prevlink': '/api/teachers/?page=' + str(previousPage)
#                         })

#     elif request.method == 'POST':
#         serializer = TeacherSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     return Response()
    
# @api_view(['GET', 'POST'])
# def post_list(request):
#     if request.method == 'GET':
#         data = []
#         nextPage = 1
#         previousPage = 1
#         posts = Post.objects.all()
#         print(posts)
#         page = request.GET.get('page', 1)
#         paginator = Paginator(posts, 10)

#         try:
#             data = paginator.page(page)
#         except PageNotAnInteger:
#             data = paginator.page(1)
#         except EmptyPage:
#             data = paginator.page(paginator.num_pages)

#         serializer = PostSerializer(data,context={'request': request} ,many=True)

#         if data.has_next():
#             nextPage = data.next_page_number()
#         if data.has_previous():
#             previousPage = data.previous_page_number()

#         return Response({'data': serializer.data , 
#                          'count': paginator.count, 
#                          'numpages' : paginator.num_pages, 
#                          'nextlink': '/api/posts/?page=' + str(nextPage), 
#                          'prevlink': '/api/posts/?page=' + str(previousPage)
#                         })

#     elif request.method == 'POST':
#         serializer = PostSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     return Response()
