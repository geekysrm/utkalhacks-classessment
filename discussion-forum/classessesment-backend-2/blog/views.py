from django.shortcuts import render,HttpResponse,redirect,get_object_or_404,reverse
from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Post, Comment
from django.contrib.auth.decorators import login_required
from .forms import QuestionForm, CommentForm
import hashlib
import paralleldots
from django.contrib import messages

def check_profanity(str):
    API_KEY = 'CXzdEjT6iFqefK5cLrK8lmdFqQ6F4WNiSrnequ5GXzs'
    paralleldots.set_api_key(API_KEY)
    
    response=paralleldots.abuse(str)
    
    if response['sentence_type'] == 'Abusive' and response['confidence_score'] >= 0.35:
        return True
    else:
        return False



def encrypt_string(hash_string):
    sha_signature = \
        hashlib.sha256(hash_string.encode()).hexdigest()
    return sha_signature



# Create your views here.
@login_required
def home(request):
    # return HttpResponse('<h1>Blog - Home</h1>')
    posts = Post.objects.all()
    hash_user = []
    for post in posts:
        # if post.author.profile.category != 'tch':
        if post.anonymous == True:
            hash_user.append(encrypt_string(post.author.username)[:15])
        else:
            hash_user.append(post.author.username)
    
    context = {
        'posts':zip(posts, hash_user),
        'name':'Home Page',
        'head':'Home page'
    }
    return render(request, 'blog/home.html', context=context)

@login_required
def tagview(request, string):
    posts = Post.objects.filter(tags__name__in=[string])
    hash_user = []
    for post in posts:
        # if post.author.profile.category != 'tch' and post.anonymous == True:
        if post.anonymous == True:
            hash_user.append(encrypt_string(post.author.username)[:15])
        else:
            hash_user.append(post.author.username)

    context = {
        'posts':zip(posts, hash_user),
        'name':'Home Page' + string,
        'head':'Questions tagged ' + string
    }
    return render(request, 'blog/home.html', context=context)

@login_required
def thread(request, id):
    if request.method == 'POST':
        
        form = CommentForm(request.POST)

        if form.is_valid():
            profanity = check_profanity(form.cleaned_data['comment_content'])
            if profanity:
                messages.warning(request, 'Your comment is abusive. Redirecting you to Home Page')
                return redirect('blog-home')
            post = get_object_or_404(Post,id = id)
            # comment = Comment(article=post, comment_author=form.cleaned_data['comment_author'], comment_content=form.cleaned_data['comment_content'])
            # comment.objects.create()
            model_object = form.save(commit=False)
            model_object.article = post
            model_object.comment_author = request.user.username
            if request.user.profile.category != 'tch':
                if model_object.anonymous:
                    if model_object.comment_author:
                        model_object.comment_author =  encrypt_string(request.user.username)[:15]
            # form.save()
            model_object.save()
            return redirect('blog-home')
    
    post = get_object_or_404(Post,id = id)
    author = post.author.username
    # if post.author.profile.category != 'tch':
    if post.anonymous == True:
        author = encrypt_string(post.author.username)[:15]
    comments = post.comment_set.all()
    comment_form = CommentForm()

    ctx = {
        'post': post,
        'author':author,
        'comment_form' : comment_form,
        'comments': comments
    }

    return render(request, 'blog/details.html', ctx)



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
        # print('asdasjdakjsdkasbdkjbkajsbdkajbsd')        
        form = QuestionForm(request.POST)
        # print('in oiasdjasdbk')
        if form.is_valid():
            profanity1 = check_profanity(form.cleaned_data['content'])
            profanity2 = check_profanity(form.cleaned_data['title'])
            if profanity1 or profanity2:
                messages.warning(request, 'Your content is abusive. Redirecting you to Home Page')
                return redirect('blog-home')
            model_object = form.save(commit=False)
            # model_object.article = post
            # print(model_object.tags)
            model_object.author = request.user
            # model_object.tags = form.cleaned_data['tags']
            # print(set(form.cleaned_data['tags']))
            # if model_object.anonymous:
            #     if model_object.comment_author:
            #         model_object.comment_author =  encrypt_string(request.user.username)[:15]
            # form.save()
            model_object.save()
            form.save_m2m()
            # form.save()
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