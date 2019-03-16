from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Post

@receiver(post_save, sender=User)
def create_post(sender, instance,created, **kwargs):
    if created:
        Post.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_post(sender, instance, **kwargs):
    instance.post.save()