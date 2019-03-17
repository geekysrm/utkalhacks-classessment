from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, ProfileUpdateForm, UserUpdateForm, ProfileRegistrationForm

# Create your views here.

def register(request):
    if request.method == 'POST':
        form1 = UserRegisterForm(request.POST)
        form2 = ProfileRegistrationForm(request.POST)
        if form1.is_valid() and form2.is_valid():
            form1.save()
            print(form1.cleaned_data)
            model_object = form2.save(commit=False)
            model_object.user = form1
            print(model_object.category)
            model_object.save() 
            # form2.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Your account has been created. You are now able to login.')
        return redirect('login')

    else:
        form1 = UserRegisterForm()
        # form2 = ProfileRegistrationForm()
        ctx = {
            'form1':form1,
            # 'form2':form2
        }

        return render(request, 'users/register.html', context=ctx)

@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
    
            messages.success(request, f'Your profile has been updated.')
            return redirect('user-profile')

    else:
        user_form = UserUpdateForm(instance=request.user)
        profile_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'user_form': user_form,
        'profile_form': profile_form
    }
    return render(request, 'users/profile.html', context)