from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length = 100)
    content = models.TextField()
    dateposted = models.DateTimeField(default=timezone.now)

# class QuestionModel(models.Model):

class Comment(models.Model):
    article = models.ForeignKey(Post,on_delete = models.CASCADE)
    comment_author = models.CharField(max_length = 50)
    comment_content = models.CharField(max_length = 200)
    comment_date = models.DateTimeField(default=timezone.now)
    anonymous = models.BooleanField()
    def __str__(self):
        return self.comment_content
    class Meta:
        ordering = ['-comment_date']
    