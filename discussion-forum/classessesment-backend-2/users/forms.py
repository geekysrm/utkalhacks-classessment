from django import forms
from django.contrib.auth.models import User
# from django.conf import settings
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    user_type = forms.ChoiceField(label="Account type", choices=[('student', 'Student'),
                                                           ('teacher', 'Teacher')])
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email']

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['image']