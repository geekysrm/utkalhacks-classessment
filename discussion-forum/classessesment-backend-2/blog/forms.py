from django import forms
# from django.contrib.auth.models import User
# from django.conf import settings
# from django.contrib.auth.forms import UserCreationForm
# from .models import Profile
from .models import Comment, Post

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = ('author', 'dateposted',)
        # fields = '__all__'

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        exclude = ('article','comment_author')
        # fields = '__all__'