from django import forms
from .models import Comment, Post

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = ('author', 'dateposted',)
        # fields = '__all__'

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        exclude = ('article', 'comment_author', 'comment_date',)
        # fields = '__all__'