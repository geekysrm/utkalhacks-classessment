from django.db import models
from django.contrib.auth.models import User

class Teacher(models.Model):

    _id = models.AutoField(primary_key=True)
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    subject = models.CharField("Subject", max_length=255)

    def __str__(self):
        return self.first_name + self.last_name


class Post(models.Model):

    teacher_id = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return self.teacher_id.first_name + 'Answers' + str(self.id)