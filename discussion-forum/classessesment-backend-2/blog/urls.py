from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='blog-home'),
    path('/<string>', views.tagview, name='tag-view'),
    path('about/', views.about, name='blog-about'),
    path('thread/<int:id>', views.thread, name='thread'),
    path('postquestion/', views.askquestion, name='question'),
    # path('thread/comment/<int:id>', views.thread, name='thread-comment'),
]

# from django.urls import path
# from .views import (
#     PostListView,
#     PostDetailView,
#     PostCreateView,
#     PostUpdateView,
#     PostDeleteView
# )
# from . import views

# urlpatterns = [
#     path('', PostListView.as_view(), name='blog-home'),
#     path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
#     path('post/new/', PostCreateView.as_view(), name='post-create'),
#     path('post/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
#     path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
#     path('about/', views.about, name='blog-about'),
# ]