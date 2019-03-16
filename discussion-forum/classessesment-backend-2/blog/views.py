# from django.shortcuts import render
# from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
# from django.views.generic import (
#     ListView,
#     DetailView,
#     CreateView,
#     UpdateView,
#     DeleteView
# )
# from .models import Post


# def home(request):
#     context = {
#         'posts': Post.objects.all()
#     }
#     return render(request, 'blog/home.html', context)


# class PostListView(ListView):
#     model = Post
#     template_name = 'blog/home.html'  # <app>/<model>_<viewtype>.html
#     context_object_name = 'posts'
#     ordering = ['-date_posted']


# class PostDetailView(DetailView):
#     model = Post


# class PostCreateView(LoginRequiredMixin, CreateView):
#     model = Post
#     fields = ['title', 'content']

#     def form_valid(self, form):
#         form.instance.author = self.request.user
#         return super().form_valid(form)


# class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
#     model = Post
#     fields = ['title', 'content']

#     def form_valid(self, form):
#         form.instance.author = self.request.user
#         return super().form_valid(form)

#     def test_func(self):
#         post = self.get_object()
#         if self.request.user == post.author:
#             return True
#         return False


# class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
#     model = Post
#     success_url = '/'

#     def test_func(self):
#         post = self.get_object()
#         if self.request.user == post.author:
#             return True
#         return False


# def about(request):
#     return render(request, 'blog/about.html', {'title': 'About'})

from django.shortcuts import render,HttpResponse,redirect,get_object_or_404,reverse
from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Post, Comment
from django.contrib.auth.decorators import login_required
from .forms import QuestionForm, CommentForm
import hashlib

def encrypt_string(hash_string):
    sha_signature = \
        hashlib.sha256(hash_string.encode()).hexdigest()
    return sha_signature
# hash_string = 'confidential data'
# sha_signature = encrypt_string(hash_string)
# print(sha_signature)
# 3fef7ff0fc1660c6bd319b3a8109fcb9f81985eabcbbf8958869ef03d605a9eb

# Create your views here.
@login_required
def home(request):
    # return HttpResponse('<h1>Blog - Home</h1>')
    context = {
        'posts':Post.objects.all(),
        'name':'Home Page'
    }
    return render(request, 'blog/home.html', context=context)

@login_required
def thread(request, id):
    if request.method == 'POST':
        
        form = CommentForm(request.POST)

        if form.is_valid():
            post = get_object_or_404(Post,id = id)
            # comment = Comment(article=post, comment_author=form.cleaned_data['comment_author'], comment_content=form.cleaned_data['comment_content'])
            # comment.objects.create()
            model_object = form.save(commit=False)
            model_object.article = post
            model_object.comment_author = request.user.username
            if model_object.anonymous:
                model_object.comment_author = encrypt_string(request.user.username)[:15]
            # form.save()
            model_object.save()
            redirect('blog-home')
    
    post = get_object_or_404(Post,id = id)
    comments = post.comment_set.all()
    comment_form = CommentForm()

    ctx = {
        'post': post,
        'comment_form' : comment_form,
        'comments': comments
    }

    return render(request, 'blog/details.html', {'post': post,'comments': comments, 'comment_form':comment_form})



@login_required
def about(request):
    
    context = {
        'title':'About Page',
        'name':'About Page'
    }
    return render(request, 'blog/about.html', context=context)

@login_required
def askquestion(request):
    print(request.method)   
    if request.method == 'POST':
        print('asdasjdakjsdkasbdkjbkajsbdkajbsd')        
        form = QuestionForm(request.POST)
        print('in oiasdjasdbk')
        if form.is_valid():
            form.save()
            return redirect('blog-home')
    else:
        q_form = QuestionForm()

        ctx = {
            'q_form' : q_form
        }
        return render(request, 'blog/askquestion.html', ctx)

@login_required
def makecomment(request, id):
    if request.method == 'POST':
        
        form = CommentForm(request.POST)

        if form.is_valid():
            post = get_object_or_404(Post,id = id)
            comment = Comment(article=post, comment_author=form.cleaned_data['comment_author'], comment_content=form.cleaned_data['comment_content'])
            comment.objects.create()
            redirect('thread-comment')
    
    post = get_object_or_404(Post,id = id)
    comments = post.comment_set.all()
    comment_form = CommentForm()

    ctx = {
        'post': post,
        'comment_form' : comment_form,
        'comments': comments
    }
    return render(request, 'blog/details.html', ctx)