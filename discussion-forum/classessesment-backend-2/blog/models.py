from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from taggit.managers import TaggableManager


# Create your models here.

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length = 100)
    content = models.TextField()
    dateposted = models.DateTimeField(default=timezone.now)
    tags = TaggableManager()
    anonymous = models.BooleanField()

# class QuestionModel(models.Model):

class Comment(models.Model):
    article = models.ForeignKey(Post,on_delete = models.CASCADE)
    comment_author = models.CharField(max_length = 50)
    comment_content = models.TextField()
    comment_date = models.DateTimeField(default=timezone.now)
    anonymous = models.BooleanField()
    def __str__(self):
        return self.comment_content
    class Meta:
        ordering = ['-comment_date']
    